local log = require "skynet-fly.log"
local errors_msg = require "common.msg.errors_msg"
local game_msg = require "msg.game_msg"
local GAME_STATE = require "enum.GAME_STATE"
local timer = require "skynet-fly.timer"
local time_util = require "skynet-fly.utils.time_util"
local env_util = require "skynet-fly.utils.env_util"
local table_util = require "skynet-fly.utils.table_util"
local skynet = require "skynet"
local json = require "cjson"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local player_rpc = require "common.rpc.hallserver.player"
local GAME_ID_ENUM = require "common.enum.GAME_ID_ENUM"
local chess_rule = hotfix_require "table.chess_rule"
local module_cfg = require "skynet-fly.etc.module_info".get_cfg()
local seater = hotfix_require "table.seater"
local TEAM_TYPE = require "enum.TEAM_TYPE"
local chess_conf = hotfix_require "common.conf.chess_conf"
local schema = hotfix_require "common.enum.schema"

local assert = assert
local setmetatable = setmetatable
local pairs = pairs
local ipairs = ipairs
local table = table
local tonumber = tonumber
local os = os
local next = next
local math = math

local g_record_cli = orm_table_client:new("record")   --对局记录

local g_svr_id = env_util.get_svr_id()

local M = {}
local mata = {__index = M}

function M:new(table_id, m_interface_mgr, play_type)
    if table_id == 1 then  -- 1是测试创建的房间
        return
    end
    
    local t = {
        m_table_id = table_id,
        m_interface_mgr = m_interface_mgr,
        m_game_msg = game_msg:new(m_interface_mgr),
        m_game_state = GAME_STATE.waiting, 	         --参与游戏的玩家座位号
        m_doing_seat_id = nil,                  	 --操作座位号
        m_seat_list = {},						 	 --座位列表
        m_player_seat_map = {},				 	     --玩家座位号
        m_enter_num = 0,                       	     --坐下数量
        m_game_seat_id_list = {},               	 --游戏参与座位号列表
        m_next_doing = {seat_id = 0,player_id = 0},  --接下来谁操作
        m_win_player_id = 0,					     --赢家
        m_play_type = play_type,                     --玩法类型

        --对局记录
        m_record_info = {
            init_chess_list = nil, --初始象棋位置
            move_pos_list = {},   --走棋记录
            player_info_list = {}, --玩家信息
            win_player_id = nil,   --赢家
        },
        
        m_join_time_out = timer:new(timer.minute, 1, m_interface_mgr.kick_out_all, m_interface_mgr, "join time out"),

        --棋子数据
        m_chess_list = {},                     --棋子数据
        m_chess_map = {},
        m_boss_chess_map = {},                  --帅和将
        m_can_move_map = {},
    }


    local play_cfg = chess_conf.get_type_cfg(play_type)
    if not play_cfg then
        log.error("can`t get play_cfg ", play_type)
    else
        t.m_play_cfg = table_util.deep_copy(play_cfg)
    end
    
    --座位初始化
    for i = 1,module_cfg.table_conf.player_num do
        t.m_seat_list[i] = seater:new()
		t.m_seat_list[i]:set_doing_time(play_cfg.total_time or 600, play_cfg.doing_time or 60)
    end

    setmetatable(t, mata)
    return t
end

--操作超时
local function doing_time_out(self, seat_player)
    --log.info("doing_time_out >>> ", seat_player)
    seat_player:doing_end()

    local seat_id = seat_player:get_seat_id()
    local win_seat_id = nil
    for _, id in pairs(self.m_game_seat_id_list) do
        if id ~= seat_id then
            win_seat_id = id
            break
        end
    end
    self:game_over(win_seat_id)
end

function M:up_doing_time()
    local seat_id = self.m_next_doing.seat_id
    local seat_player = self.m_seat_list[seat_id]
    if seat_player then
        self.m_next_doing.remain_total_time, self.m_next_doing.remain_once_time = seat_player:get_doing_time()
    end
end

--发送游戏当前状态信息
function M:send_game_state(seat_player)
	self:up_doing_time()

	local msg_body = {
		state = self.m_game_state,
		player_list = {},
		chess_list = self.m_chess_list,
		next_doing = self.m_next_doing,
		win_player_id = self.m_win_player_id,
	}

	for seat_id,seat_player in ipairs(self.m_seat_list) do
		local player = seat_player:get_player()
		if player then
			table.insert(msg_body.player_list,{
				player_id = player.player_id,
				seat_id = seat_id,
				team_type = seat_player:get_team_type(),
				nickname = player.nickname,
				score = seat_player:get_score(),
			})
		end
	end

	
	if seat_player then
        return msg_body --rpc回复就行
    else
        self.m_game_msg:game_state_res(msg_body)        --广播
	end
end

function M:set_next_doing(seat_id)
    local seat_player = self.m_seat_list[seat_id]
    local player = seat_player:get_player()
    self.m_next_doing.seat_id = seat_id
    self.m_next_doing.player_id = player.player_id
    self.m_next_doing.team_type = seat_player:get_team_type()
    self.m_next_doing.can_move_list = {}

    self:up_doing_time()

    self.m_can_move_map = chess_rule.get_all_can_move_map(self.m_chess_list,self.m_chess_map,self.m_boss_chess_map,self.m_next_doing.team_type)
    --log.info("m_can_move_map:",m_next_doing.team_type,m_can_move_map)
    for chess_id,can_move_list in pairs(self.m_can_move_map) do
        local row_list = {}
        local col_list = {}
        for _,pos in ipairs(can_move_list) do
            table.insert(row_list,pos.row)
            table.insert(col_list,pos.col)
        end
        table.insert(self.m_next_doing.can_move_list,{
            chess_id = chess_id,
            row_list = row_list,
            col_list = col_list,
        })
    end

    if not next(self.m_can_move_map) then
        return false
    end

    seat_player:start_doing(doing_time_out, self, seat_player)
    return true
end

--发送接下来谁操作
function M:send_next_doing()
	--log.error("send_next_doing:",m_next_doing)
	self:up_doing_time()
	self.m_game_msg:next_doing(self.m_next_doing)
end


-----------------------------------------------------------------------
--state
-----------------------------------------------------------------------
--开始游戏
function M:game_start()
    --log.info("游戏开始:", m_table_id)
    self.m_game_state = GAME_STATE.playing
    self.m_game_seat_id_list = {}
    self.m_join_time_out:cancel()

    local rand_num = math.random(1,2)
    local next_doing_seat_id = nil
    for seat_id,seater in ipairs(self.m_seat_list) do
        if not seater:is_empty() then
            seater:game_start()
            table.insert(self.m_game_seat_id_list,seat_id)
            if seat_id == rand_num then
                seater:set_team_type(TEAM_TYPE.RED)
                next_doing_seat_id = seat_id
            else
                seater:set_team_type(TEAM_TYPE.BLACK)
            end
        end
    end
    
    self.m_chess_list,self.m_chess_map,self.m_boss_chess_map = chess_rule.get_init_chess_list()
    self.m_record_info.init_chess_list = table_util.deep_copy(self.m_chess_list)
    assert(next_doing_seat_id)
    self:set_next_doing(next_doing_seat_id)

    self:send_game_state()
end
--游戏结束
function M:game_over(win_seat_id)
    --log.info("游戏结束:",win_seat_id, self.m_table_id)
    self.m_game_state = GAME_STATE.over
    --踢出所有玩家
    for _,seat_player in ipairs(self.m_seat_list) do
        seat_player:game_over()
    end

    local seat_player = self.m_seat_list[win_seat_id]
    self.m_win_player_id = seat_player:get_player().player_id

    local lose_seat_player = nil
    for _,seat_id in ipairs(self.m_game_seat_id_list) do
        if seat_id ~= win_seat_id then
            lose_seat_player = self.m_seat_list[seat_id]
            break
        end
    end
    local play_cfg = self.m_play_cfg
    local param = chess_conf.get_params()

    --结算积分
    local addnum = 0
    local reducenum = 0

    if self.m_play_type == schema.enums.play_type.CC_RANKING then                           --排位赛玩法才加减分
        local win_rank_level = seat_player:get_rank_level()
        local lose_rank_level = seat_player:get_rank_level()
        if math.abs(win_rank_level - lose_rank_level) >= param.low_level_cond then          --有段位差
            if win_rank_level < lose_rank_level then                                        --赢家段位小，赢家多赢分
                addnum = seat_player:add_score(param.low_win_add_score)
                reducenum = lose_seat_player:reduce_score(param.lose_reduce_score)
            else                                                                            --输家段位小，输家少输分
                addnum = seat_player:add_score(param.win_add_score)
                reducenum = lose_seat_player:reduce_score(param.low_lose_reduce_score)
            end
        else
            addnum = seat_player:add_score(param.win_add_score)
            reducenum = lose_seat_player:reduce_score(param.lose_reduce_score)
        end
    end

    local lose_player_id = lose_seat_player:get_player().player_id

    self:send_game_state()

    --获胜奖励
    seat_player:add_item_map(play_cfg.win_rewards)
    --失败奖励
    lose_seat_player:add_item_map(play_cfg.fail_rewards)

    self.m_record_info.player_info_list = {}
    for seat_id, seat_player in pairs(self.m_seat_list) do
        local info = {
            player_id = seat_player:get_player().player_id,
            team_type = seat_player:get_team_type(),
        }
        if info.player_id == self.m_win_player_id then
            info.add_score = addnum
        else
            info.add_score = reducenum
        end

        table.insert(self.m_record_info.player_info_list, info)
    end
    self.m_record_info.win_player_id = self.m_win_player_id

    local cur_time = time_util.time()

    local table_id = self.m_table_id
    local record_info = self.m_record_info
    local win_player_id = self.m_win_player_id
    skynet.fork(function()
        local record = {
            create_time = cur_time,
            table_id = table_id,
            details = json.encode(record_info),
        }
        if g_record_cli:create_one_entry(record) then
            player_rpc.add_game_record(win_player_id, cur_time, table_id, 1, GAME_ID_ENUM.chinese_chess, g_svr_id, addnum)
            player_rpc.add_game_record(lose_player_id, cur_time, table_id, -1, GAME_ID_ENUM.chinese_chess, g_svr_id, reducenum)
        end
    end)

    self.m_interface_mgr:kick_out_all("game over")
    return true
end
-----------------------------------------------------------------------
--state
-----------------------------------------------------------------------

-----------------------------------------------------------------------
--client
-----------------------------------------------------------------------
--玩家进入
function M:enter(player_id)
    assert(not self.m_player_seat_map[player_id])
    local alloc_seat_id = nil
    for seat_id,seater in ipairs(self.m_seat_list) do
        if seater:is_empty() then
            --log.info("玩家坐下:",player_id)
            if not seater:enter(player_id, seat_id) then
                log.warn("坐下失败 ", player_id, seat_id)
                return
            end
            self.m_player_seat_map[player_id] = seat_id
            self.m_enter_num = self.m_enter_num + 1
            alloc_seat_id = seat_id
            break
        end
    end

    if not alloc_seat_id then
        log.info("进入房间失败 ",player_id)
        return
    end
  
    if self.m_enter_num >= 2 then
        skynet.fork(self.game_start, self)
    end

    return alloc_seat_id
end

--玩家离开
function M:leave(player_id, reason)
    --log.info("leave ", player_id, reason)
    local seat_id = self.m_player_seat_map[player_id]
    if not seat_id then
        log.warn("not in table ",player_id)
        return
    end

    local seater = self.m_seat_list[seat_id]
    if not seater:is_can_leave() then
        log.warn_fmt("can`t leave player_id = %s game_state = %s reason = %s", player_id, self.m_game_state, reason)
        return
    else
        seater:leave()
        self.m_enter_num = self.m_enter_num - 1
        self.m_player_seat_map[player_id] = nil
    end

    --log.info("离开房间成功 ",player_id)

    return seat_id
end

--玩家掉线
function M:disconnect(player_id)
    --log.error("disconnect:",player_id)
end

--玩家重连 
function M:reconnect(player_id)
	--log.error("reconnect:",player_id)
end
-----------------------------------------------------------------------
--client
-----------------------------------------------------------------------

-----------------------------------------------------------------------
--client req
-----------------------------------------------------------------------
--玩家请求游戏状态数据
function M:game_state_req(player_id, pack_id, pack_body)
    --log.info("handle >>>> ", pack_id)
    local seat_id = self.m_player_seat_map[player_id]
    if not seat_id then
        log.warn("player not seat_down ",player_id)
        return
    end
    local seat_player = self.m_seat_list[seat_id]
    return self:send_game_state(seat_player)
end

--移动棋子
function M:move_req(player_id,pack_id,pack_body)
    --log.info("move_req >>>> ", player_id,pack_id,pack_body)
    if self.m_game_state ~= GAME_STATE.playing then
        log.warn("not is playing state ", self.m_game_state)
        return
    end
    local seat_id = self.m_player_seat_map[player_id]
    if not seat_id then
        log.warn("player not seat_down ",player_id)
        return
    end

    if seat_id ~= self.m_next_doing.seat_id then
        log.warn("can`t doing now ",seat_id)
        return
    end

    local seat_player = self.m_seat_list[seat_id]
    pack_body.chess_id = pack_body.chess_id or 0
    pack_body.move_row = pack_body.move_row or 0
    pack_body.move_col =  pack_body.move_col or 0
    local chess_id = pack_body.chess_id
    local move_row = pack_body.move_row
    local move_col = pack_body.move_col			
    local move_chess = nil
    for _,one_chess in ipairs(self.m_chess_list) do
        if one_chess.chess_id == chess_id then
            move_chess = one_chess
            break
        end
    end

    if not move_chess then
        log.warn("args err not find chess ",chess_id)
        return
    end

    local can_move_list = self.m_can_move_map[chess_id]
    if not can_move_list then
        log.warn("cant`t move chess ", chess_id)
        return
    end
    local isok = false
    for _,one_pos in ipairs(can_move_list) do
        if one_pos.row == move_row and one_pos.col == move_col then
            isok = true
            break
        end
    end

    if not isok then
        log.warn("can`t move to ",move_chess,move_row,move_col)
        return
    end

    chess_rule.move_chess(self.m_chess_list,self.m_chess_map,self.m_boss_chess_map,move_chess,{row = move_row,col = move_col})

    seat_player:doing_end()
    --log.error("moveRes:",pack_body)
    self.m_game_msg:move_res(pack_body)

    table.insert(self.m_record_info.move_pos_list, pack_body)

    local next_seat_id = (seat_id % 2) + 1
    if self:set_next_doing(next_seat_id) then
        self:send_next_doing()
    else
        self:game_over(seat_id)
    end
    return true
end
-----------------------------------------------------------------------
--client req
-----------------------------------------------------------------------

return M