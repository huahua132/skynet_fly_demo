local skynet = require "skynet"
local pb_netpack = require "pb_netpack"
local string_util = require "string_util"
local GAME_STATE_ENUM = require "GAME_STATE_ENUM"
local DOGIN_TYPE = require "DOGIN_TYPE"
local seater = require "seater"
local log = require "log"

local string = string
local assert = assert
local ipairs = ipairs
local table = table
local math = math

local M = {}

function M.init()
	pb_netpack.load('./proto')
end

--游戏桌子创建者
function M.table_creator(table_id,room_conf,ROOM_CMD)
	assert(room_conf.player_num,"not player_num")

	local m_HANDLE = {}
	local m_table_id = table_id
    local m_game_state = GAME_STATE_ENUM.waiting --参与游戏的玩家座位号
    local m_doing_seat_id = nil                  --操作座位号
    local m_seat_list = {}						 --座位列表
    local m_player_seat_map = {}				 --玩家座位号
    local m_enter_num = 0                        --坐下数量
	local m_game_seat_id_list = {}               --游戏参与座位号列表
	local m_doing_index                          --当前操作人座位号列表下标

	local m_doing_list = {}                      --操作列表

	--消息广播
	local function broadcast(packname,pack)
		for _,seat_player in ipairs(m_seat_list) do
			seat_player:send_msg(packname,pack)
		end
	end

	--座位初始化
    for i = 1,room_conf.player_num do
        m_seat_list[i] = seater:new()
    end

	local function next_doing_cast()
		--通知操作
		local player = m_seat_list[m_doing_seat_id]:get_player()
		local args = {
			doing_seat_id = m_doing_seat_id,
			doing_player_id = player.player_id,
		}
		broadcast('.game.NextDoingCast',args)
	end


-----------------------------------------------------------------------
--state
-----------------------------------------------------------------------
	--开始游戏
	local function game_start()
		m_game_state = GAME_STATE_ENUM.playing
		m_game_seat_id_list = {}

		for seat_id,seater in ipairs(m_seat_list) do
			if not seater:is_empty() then
				seater:game_start()
				table.insert(m_game_seat_id_list,seat_id)
			end
		end
	
		broadcast('.game.GameStartCast',{seat_id_list = m_game_seat_id_list})

		m_doing_index = math.random(1,#m_game_seat_id_list)
		m_doing_seat_id = m_game_seat_id_list[m_doing_index]   --先手
	
		log.info("游戏开始!!!")
		next_doing_cast()
	end

	--结束游戏
	local function game_over()
		log.info("游戏结束！！！")
		local result = ""
		local lose_player_id = nil
		local doing_one = m_doing_list[1]
		local doing_two = m_doing_list[2]

		if doing_one.doing_type == doing_two.doing_type then
			result = "平局"
		else
			if doing_one.doing_type == DOGIN_TYPE.stone then
				--玩家一石头
				if doing_two.doing_type == DOGIN_TYPE.scissors then
					--玩家二剪刀
					result = string.format("%s的%s干掉了%s的%s",doing_one.player_id,"石头",doing_two.player_id,"剪刀")
					lose_player_id = doing_two.player_id
				else
					--玩家二布
					result = string.format("%s的%s干掉了%s的%s",doing_two.player_id,"布",doing_one.player_id,"石头")
					lose_player_id = doing_one.player_id
				end
			elseif doing_one.doing_type == DOGIN_TYPE.scissors then
				--玩家一剪刀
				if doing_two.doing_type == DOGIN_TYPE.stone then
					--玩家二石头
					result = string.format("%s的%s干掉了%s的%s",doing_two.player_id,"石头",doing_one.player_id,"剪刀")
					lose_player_id = doing_one.player_id
				else
					--玩家二布
					result = string.format("%s的%s干掉了%s的%s",doing_one.player_id,"剪刀",doing_two.player_id,"布")
					lose_player_id = doing_two.player_id
				end
			else
				--玩家一布
				if doing_two.doing_type == DOGIN_TYPE.stone then
					--玩家二石头
					result = string.format("%s的%s干掉了%s的%s",doing_one.player_id,"布",doing_two.player_id,"石头")
					lose_player_id = doing_two.player_id
				else
					--玩家二剪刀
					result = string.format("%s的%s干掉了%s的%s",doing_two.player_id,"剪刀",doing_one.player_id,"布")
					lose_player_id = doing_one.player_id
				end
			end
		end

		local args = {
			lose_player_id = lose_player_id,
			doing_list = m_doing_list,
			result = result,
		}
		--广播游戏结束
		broadcast('.game.GameOverCast',args)
		m_game_state = GAME_STATE_ENUM.over

		for seat_id,seater in ipairs(m_seat_list) do
			if not seater:is_empty() then
				seater:game_over()
			end
		end

		--踢出所有玩家
		ROOM_CMD.kick_out_all(m_table_id)
		return true
	end
-----------------------------------------------------------------------
--state
-----------------------------------------------------------------------

-----------------------------------------------------------------------
--HANDLE
-----------------------------------------------------------------------
	--消息处理
	m_HANDLE['game'] = {
		--玩家操作请求
		['DoingReq'] = function(player,args)
			if m_game_state ~= GAME_STATE_ENUM.playing then
				log.info("游戏还没有开始！！！")
				return
			end
			
			local player_id = player.player_id
			local seat_id = m_player_seat_map[player_id]
			if seat_id ~= m_doing_seat_id then
				log.info("不是该玩家操作 ",player_id)
				return nil
			end

			local doing_type = args.doing_type
			if not doing_type then
				log.info("not opt_num ",args)
				return
			end

			if not DOGIN_TYPE[doing_type] then
				log.info("play args err ",player_id,doing_type)
				return nil
			end
		
			local args = {
				player_id = player_id,
				seat_id = seat_id,
				doing_type = doing_type,
			}
			broadcast('.game.DoingCast',args)

			table.insert(m_doing_list,args)
			if #m_doing_list >= 2 then
				return game_over() --游戏结束
			end
		
			--切换操作人
			m_doing_index = m_doing_index + 1
			if m_doing_index > #m_game_seat_id_list then
				m_doing_index = m_doing_index % #m_game_seat_id_list
			end
			m_doing_seat_id = m_game_seat_id_list[m_doing_index]
			next_doing_cast()
			return true
		end,
	}

-----------------------------------------------------------------------
--HANDLE
-----------------------------------------------------------------------

    return {
		--玩家进入桌子
        enter = function(player)
            local player_id = player.player_id
            assert(not m_player_seat_map[player_id])
            
            local alloc_seat_id = nil
            for seat_id,seater in ipairs(m_seat_list) do
                if seater:is_empty() then
                    seater:enter(player)
                    m_player_seat_map[player_id] = seat_id
                    m_enter_num = m_enter_num + 1
                    alloc_seat_id = seat_id
                    break
                end
            end

            if not alloc_seat_id then
                log.info("进入房间失败 ",player.player_id)
                return
            end
          
            if m_enter_num >= 2 then
                skynet.fork(game_start)
            end
        
            return alloc_seat_id
        end,
		--玩家离开桌子
		leave = function(player)
			local player_id = player.player_id
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
		disconnect = function(player)
			log.error("disconnect:",m_seat_list)
		end,
		--玩家重连
		reconnect = function(player)
			log.error("reconnect:",m_seat_list)
		end,
		--消息分发处理
		handler = function(player,packname,req)
			local pack_req = string_util.split(packname,'.')
			assert(#pack_req == 2,"packname err " .. packname)
			local package = pack_req[1]
			local msg_name = pack_req[2]

			local handle_func = m_HANDLE[package][msg_name]
			if not handle_func then
				log.error("not handle_func ",packname)
				return
			end

			local isok,errcode,errmsg = handle_func(player,req)

			if not isok then
				log.error("request err ",errcode,errmsg,packname)
				return
			end
		end,
    }
end

return M