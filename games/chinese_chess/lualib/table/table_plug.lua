local skynet = require "skynet"
local pb_netpack = require "pb_netpack"
local ws_pbnet_util = require "ws_pbnet_util"
local string_util = require "string_util"
local GAME_STATE = require "GAME_STATE"
local DOGIN_TYPE = require "DOGIN_TYPE"
local seater = require "seater"
local log = require "log"
local chess_rule = require "chess_rule"
local TEAM_TYPE = require "TEAM_TYPE"
local module_cfg = require "module_info".get_cfg()
local errors_msg = require "errors_msg"
local game_msg = require "game_msg"

local string = string
local assert = assert
local ipairs = ipairs
local table = table
local math = math
local pairs = pairs
local next = next

local g_table_conf = module_cfg.table_conf
local g_interface_mgr = nil

local M = {}

function M.init(interface_mgr)
	g_interface_mgr = interface_mgr
	assert(g_table_conf.player_num,"not player_num")
	pb_netpack.load('./proto')
end

M.send = ws_pbnet_util.send

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

	
	--棋子数据
	local m_chess_list = {}                      --棋子数据
	local m_chess_map = {}
	local m_boss_chess_map = {}                  --帅和将
	local m_can_move_map = {}

	local function set_next_doing(seat_id)
		local seat_player = m_seat_list[seat_id]
		local player = seat_player:get_player()
		m_next_doing.seat_id = seat_id
		m_next_doing.player_id = player.player_id
		m_next_doing.team_type = seat_player:get_team_type()
		m_next_doing.can_move_list = {}

		m_can_move_map = chess_rule.get_all_can_move_map(m_chess_list,m_chess_map,m_boss_chess_map,m_next_doing.team_type)
		log.info("m_can_move_map:",m_next_doing.team_type,m_can_move_map)
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
		return true
	end

	--座位初始化
    for i = 1,g_table_conf.player_num do
        m_seat_list[i] = seater:new()
    end
-----------------------------------------------------------------------
--msg
-----------------------------------------------------------------------
--发送游戏当前状态信息
local function send_game_state(seat_player)
	local msg_body = {
		state = m_game_state,
		player_list = {},
		chess_list = m_chess_list,
		next_doing = m_next_doing,
	}

	for seat_id,seat_player in ipairs(m_seat_list) do
		local player = seat_player:get_player()
		if player then
			table.insert(msg_body.player_list,{
				player_id = player.player_id,
				seat_id = seat_id,
				team_type = seat_player:get_team_type()
			})
		end
	end

	log.info("send_msg:",msg_body)
	local player_id = nil
	if seat_player then
		player_id = seat_player.player_id
	end
	
	game_msg:game_state_res(player_id,msg_body)
end

--发送接下来谁操作
local function send_next_doing()
	log.error("send_next_doing:",m_next_doing)
	game_msg:next_doing(m_next_doing)
end

-----------------------------------------------------------------------
--state
-----------------------------------------------------------------------
	--开始游戏
	local function game_start()
		m_game_state = GAME_STATE.playing
		m_game_seat_id_list = {}

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

		assert(next_doing_seat_id)
		set_next_doing(next_doing_seat_id)

		send_game_state()
	end

	--结束游戏
	local function game_over(win_seat_id)
		log.info("游戏结束:",win_seat_id)
		m_game_state = GAME_STATE.over
		--踢出所有玩家
		for _,seat_player in ipairs(m_seat_list) do
			seat_player:game_over()
		end

		local seat_player = m_seat_list[win_seat_id]
		local win_player_id = seat_player:get_player().player_id

		send_game_state()
		m_interface_mgr:kick_out_all()
		return true
	end
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
					log.info("玩家坐下:",player_id)
                    seater:enter(player_id)
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

			log.info("离开房间成功 ",player_id)

			return seat_id
		end,
		--玩家掉线
		disconnect = function(player_id)
			log.error("disconnect:",player_id)
		end,
		--玩家重连
		reconnect = function(player_id)
			log.error("reconnect:",player_id)
		end,
		--消息分发处理
		handle = {
			--玩家请求游戏状态数据
			['.chinese_chess_game.gameStateReq'] = function(player_id,packname,pack_body)
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

				log.error("moveRes:",pack_body)
				game_msg:move_res(pack_body)

				local next_seat_id = (seat_id % 2) + 1
				if set_next_doing(next_seat_id) then
					send_next_doing()
				else
					game_over(seat_id)
				end
				return true
			end
		}
    }
end

return M