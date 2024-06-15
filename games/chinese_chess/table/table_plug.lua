local skynet = require "skynet"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local ws_pbnet_util = require "skynet-fly.utils.net.ws_pbnet_util"
local string_util = require "skynet-fly.utils.string_util"
local GAME_STATE = require "enum.GAME_STATE"
local seater = require "table.seater"
local log = require "skynet-fly.log"
local chess_rule = require "table.chess_rule"
local TEAM_TYPE = require "enum.TEAM_TYPE"
local module_cfg = require "skynet-fly.etc.module_info".get_cfg()
local errors_msg = require "gamecommon.msg.errors_msg"
local game_msg = require "msg.game_msg"
local timer = require "skynet-fly.timer"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local table_util = require "skynet-fly.utils.table_util"
local time_util = require "skynet-fly.utils.time_util"
local player_rpc = require "common.rpc.hallserver.player"
local json = require "cjson"
local GAME_ID_ENUM = require "common.enum.GAME_ID_ENUM"
local env_util = require "skynet-fly.utils.env_util"

local string = string
local assert = assert
local ipairs = ipairs
local table = table
local math = math
local pairs = pairs
local next = next
local os = os
local tonumber = tonumber

local g_record_cli = orm_table_client:new("record")   --对局记录

local g_svr_id = env_util.get_svr_id()

local g_table_conf = module_cfg.table_conf
local g_interface_mgr = nil

local M = {}

function M.init(interface_mgr)
	g_interface_mgr = interface_mgr
	assert(g_table_conf.player_num,"not player_num")
	pb_netpack.load('../../commonlualib/gamecommon/proto')
	pb_netpack.load('./proto')
end

M.ws_send = ws_pbnet_util.send
M.ws_broadcast = ws_pbnet_util.broadcast

--游戏桌子创建者
function M.table_creator(table_id)
	local m_HANDLE = {}
	local m_table_id = table_id
	local m_interface_mgr = g_interface_mgr:new(table_id)
	local m_errors_msg = errors_msg:new(m_interface_mgr)
	local m_game_msg = game_msg:new(m_interface_mgr)
    local m_game_state = GAME_STATE.waiting 	 --参与游戏的玩家座位号
    local m_doing_seat_id = nil                  	 --操作座位号
    local m_seat_list = {}						 	 --座位列表
    local m_player_seat_map = {}				 	 --玩家座位号
    local m_enter_num = 0                        	 --坐下数量
	local m_game_seat_id_list = {}               	 --游戏参与座位号列表
	local m_next_doing = {seat_id = 0,player_id = 0} --接下来谁操作
	local m_win_player_id = 0					     --赢家
	
	--对局记录
	local m_record_info = {
		init_chess_list = nil, --初始象棋位置
		move_pos_list = {},   --走棋记录
		player_info_list = {}, --玩家信息
		win_player_id = nil,   --赢家
	}

	local function dismisstable()
		m_interface_mgr:kick_out_all()
	end
	local m_join_time_out
	if table_id ~= 1 then  --测试创建
		m_join_time_out = timer:new(timer.minute, 1, dismisstable)
	end
	--棋子数据
	local m_chess_list = {}                      --棋子数据
	local m_chess_map = {}
	local m_boss_chess_map = {}                  --帅和将
	local m_can_move_map = {}

	--操作超时
	local m_game_over = nil
	local function doing_time_out(seat_player)
		--log.info("doing_time_out >>> ", seat_player)
		seat_player:doing_end()

		local seat_id = seat_player:get_seat_id()
		local win_seat_id = nil
		for _, id in pairs(m_game_seat_id_list) do
			if id ~= seat_id then
				win_seat_id = id
				break
			end
		end
		m_game_over(win_seat_id)
	end

	local function up_doing_time()
		local seat_id = m_next_doing.seat_id
		local seat_player = m_seat_list[seat_id]
		if seat_player then
			m_next_doing.remain_total_time, m_next_doing.remain_once_time = seat_player:get_doing_time()
		end
	end

	local function set_next_doing(seat_id)
		local seat_player = m_seat_list[seat_id]
		local player = seat_player:get_player()
		m_next_doing.seat_id = seat_id
		m_next_doing.player_id = player.player_id
		m_next_doing.team_type = seat_player:get_team_type()
		m_next_doing.can_move_list = {}

		up_doing_time()

		m_can_move_map = chess_rule.get_all_can_move_map(m_chess_list,m_chess_map,m_boss_chess_map,m_next_doing.team_type)
		--log.info("m_can_move_map:",m_next_doing.team_type,m_can_move_map)
		for chess_id,can_move_list in pairs(m_can_move_map) do
			local row_list = {}
			local col_list = {}
			for _,pos in ipairs(can_move_list) do
				table.insert(row_list,pos.row)
				table.insert(col_list,pos.col)
			end
			table.insert(m_next_doing.can_move_list,{
				chess_id = chess_id,
				row_list = row_list,
				col_list = col_list,
			})
		end

		if not next(m_can_move_map) then
			return false
		end

		seat_player:start_doing(doing_time_out)
		return true
	end

	--座位初始化
    for i = 1,g_table_conf.player_num do
        m_seat_list[i] = seater:new()
		m_seat_list[i]:set_doing_time(60 * 20 * 100, 60 * 100)   --操作总时长20分钟, 单次1分钟
    end
-----------------------------------------------------------------------
--msg
-----------------------------------------------------------------------
--发送游戏当前状态信息
local function send_game_state(seat_player)
	up_doing_time()

	local msg_body = {
		state = m_game_state,
		player_list = {},
		chess_list = m_chess_list,
		next_doing = m_next_doing,
		win_player_id = m_win_player_id,
	}

	for seat_id,seat_player in ipairs(m_seat_list) do
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

	local player_id = nil
	if seat_player then
		player_id = seat_player.player_id
	end
	
	m_game_msg:game_state_res(player_id,msg_body)
end

--发送接下来谁操作
local function send_next_doing()
	--log.error("send_next_doing:",m_next_doing)
	up_doing_time()
	m_game_msg:next_doing(m_next_doing)
end

-----------------------------------------------------------------------
--state
-----------------------------------------------------------------------
	--开始游戏
	local function game_start()
		--log.info("游戏开始:", m_table_id)
		m_game_state = GAME_STATE.playing
		m_game_seat_id_list = {}
		m_join_time_out:cancel()

		local rand_num = math.random(1,2)
		local next_doing_seat_id = nil
		for seat_id,seater in ipairs(m_seat_list) do
			if not seater:is_empty() then
				seater:game_start()
				table.insert(m_game_seat_id_list,seat_id)
				if seat_id == rand_num then
					seater:set_team_type(TEAM_TYPE.RED)
					next_doing_seat_id = seat_id
				else
					seater:set_team_type(TEAM_TYPE.BLACK)
				end
			end
		end
		
		m_chess_list,m_chess_map,m_boss_chess_map = chess_rule.get_init_chess_list()
		m_record_info.init_chess_list = table_util.deep_copy(m_chess_list)
		assert(next_doing_seat_id)
		set_next_doing(next_doing_seat_id)

		send_game_state()
	end

	--结束游戏
	local function game_over(win_seat_id)
		--log.info("游戏结束:",win_seat_id, m_table_id)
		m_game_state = GAME_STATE.over
		--踢出所有玩家
		for _,seat_player in ipairs(m_seat_list) do
			seat_player:game_over()
		end

		local seat_player = m_seat_list[win_seat_id]
		m_win_player_id = seat_player:get_player().player_id

		local lose_seat_player = nil
		for _,seat_id in ipairs(m_game_seat_id_list) do
			if seat_id ~= win_seat_id then
				lose_seat_player = m_seat_list[seat_id]
				break
			end
		end

		--结算积分
		--赢了加10分
		seat_player:add_score(10)
		--输了减10分
		lose_seat_player:reduce_score(10)

		local lose_player_id = lose_seat_player:get_player().player_id

		send_game_state()

		m_record_info.player_info_list = {}
		for seat_id, seat_player in pairs(m_seat_list) do
			local info = {
				player_id = seat_player:get_player().player_id,
				team_type = seat_player:get_team_type(),
			}
			if info.player_id == m_win_player_id then
				info.add_score = 10
			else
				info.add_score = -10
			end

			table.insert(m_record_info.player_info_list, info)
		end
		m_record_info.win_player_id = m_win_player_id

		local cur_time = time_util.time()

		-- skynet.fork(function()
		-- 	local date = tonumber(os.date("%Y%m%d", cur_time))
		-- 	local id = table_id .. ':' .. cur_time
		-- 	local record = {
		-- 		date = date,
		-- 		id = id,
		-- 		create_time = cur_time,
		-- 		details = json.encode(m_record_info),
		-- 	}
		-- 	if g_record_cli:create_one_entry(record) then
		-- 		player_rpc.add_game_record(m_win_player_id, date, id, 1, GAME_ID_ENUM.chinese_chess, g_svr_id)
		-- 		player_rpc.add_game_record(lose_player_id, date, id, -1, GAME_ID_ENUM.chinese_chess, g_svr_id)
		-- 	end
		-- end)

		m_interface_mgr:kick_out_all()
		return true
	end
	m_game_over = game_over
-----------------------------------------------------------------------
--state
-----------------------------------------------------------------------
    return {
		--玩家进入桌子
        enter = function(player_id)
            assert(not m_player_seat_map[player_id])
            local alloc_seat_id = nil
            for seat_id,seater in ipairs(m_seat_list) do
                if seater:is_empty() then
					--log.info("玩家坐下:",player_id)
                    if not seater:enter(player_id, seat_id) then
						log.warn("坐下失败 ", player_id, seat_id)
						return
					end
                    m_player_seat_map[player_id] = seat_id
                    m_enter_num = m_enter_num + 1
                    alloc_seat_id = seat_id
                    break
                end
            end

            if not alloc_seat_id then
                log.info("进入房间失败 ",player_id)
                return
            end
          
            if m_enter_num >= 2 then
                skynet.fork(game_start)
            end

            return alloc_seat_id
        end,
		--玩家离开桌子
		leave = function(player_id)
			local seat_id = m_player_seat_map[player_id]
			if not seat_id then
				log.error("not in table ",player_id)
				return
			end

			local seater = m_seat_list[seat_id]
			if not seater:is_can_leave() then
				return
			else
				seater:leave()
				m_enter_num = m_enter_num - 1
				m_player_seat_map[player_id] = nil
			end

			--log.info("离开房间成功 ",player_id)

			return seat_id
		end,
		--玩家掉线
		disconnect = function(player_id)
			--log.error("disconnect:",player_id)
		end,
		--玩家重连
		reconnect = function(player_id)
			--log.error("reconnect:",player_id)
		end,
		--消息分发处理
		handle = {
			--玩家请求游戏状态数据
			['.chinese_chess_game.gameStateReq'] = function(player_id,packname,pack_body)
				--log.info("handle >>>> ", packname)
				local seat_id = m_player_seat_map[player_id]
				if not seat_id then
					log.error("player not seat_down ",player_id)
					return
				end
				local seat_player = m_seat_list[seat_id]
				send_game_state(seat_player)
				return true
			end,
			['.chinese_chess_game.moveReq'] = function (player_id,packname,pack_body)
				if m_game_state ~= GAME_STATE.playing then
					log.error("not is playing state ", m_game_state)
					return
				end
				local seat_id = m_player_seat_map[player_id]
				if not seat_id then
					log.error("player not seat_down ",player_id)
					return
				end

				if seat_id ~= m_next_doing.seat_id then
					log.error("can`t doing now ",seat_id)
					return
				end

				local seat_player = m_seat_list[seat_id]
				pack_body.chess_id = pack_body.chess_id or 0
				pack_body.move_row = pack_body.move_row or 0
				pack_body.move_col =  pack_body.move_col or 0
				local chess_id = pack_body.chess_id
				local move_row = pack_body.move_row
				local move_col = pack_body.move_col			
				local move_chess = nil
				for _,one_chess in ipairs(m_chess_list) do
					if one_chess.chess_id == chess_id then
						move_chess = one_chess
						break
					end
				end

				if not move_chess then
					log.error("args err not find chess ",chess_id)
					return
				end

				local can_move_list = m_can_move_map[chess_id]
				local isok = false
				for _,one_pos in ipairs(can_move_list) do
					if one_pos.row == move_row and one_pos.col == move_col then
						isok = true
						break
					end
				end

				if not isok then
					log.error("can`t move to ",move_chess,move_row,move_col)
					return
				end

				chess_rule.move_chess(m_chess_list,m_chess_map,m_boss_chess_map,move_chess,{row = move_row,col = move_col})

				seat_player:doing_end()
				--log.error("moveRes:",pack_body)
				m_game_msg:move_res(pack_body)

				table.insert(m_record_info.move_pos_list, pack_body)

				local next_seat_id = (seat_id % 2) + 1
				if set_next_doing(next_seat_id) then
					send_next_doing()
				else
					game_over(seat_id)
				end
				return true
			end
		},

		handle_end = function(player_id, packname, pack_body, ret, errcode, errmsg)
			--log.info("handle_end >>> ", player_id, packname, ret, errcode, errmsg)
			if not ret then
				m_errors_msg:errors(player_id, errcode, errmsg, packname)
			end
		end,
    }
end

return M