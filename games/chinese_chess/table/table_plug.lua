local skynet = require "skynet"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local ws_pbnet_byrpc = require "skynet-fly.utils.net.ws_pbnet_byrpc"
local log = require "skynet-fly.log"
local module_cfg = require "skynet-fly.etc.module_info".get_cfg()
local pack_helper = require "common.pack_helper"

do
	pb_netpack.load('../../commonlualib/protos/gamecommon')
	pb_netpack.load('../../commonlualib/protos/common')
	pb_netpack.load('../../commonlualib/protos/chinese_chess')

	--协议码 协议消息名建立映射关系
	pack_helper.set_pack_id_names()
end

local PACK = pack_helper.PACK

local errors_msg = require "common.msg.errors_msg"
local rsp_msg = require "common.msg.rsp_msg"
local table_logic = hotfix_require "table.table_logic"

local string = string
local assert = assert
local ipairs = ipairs
local table = table
local math = math
local pairs = pairs
local next = next
local os = os
local tonumber = tonumber
local tunpack = table.unpack

local M = {}

local g_interface_mgr = nil

function M.init(interface_mgr)
	g_interface_mgr = interface_mgr
	assert(module_cfg.table_conf.player_num,"not player_num")
	
end

M.ws_send = ws_pbnet_byrpc.send
M.ws_broadcast = ws_pbnet_byrpc.broadcast
M.rpc_pack = require "skynet-fly.utils.net.rpc_server"

--游戏桌子创建者
function M.table_creator(table_id, table_name, play_type)
	local m_interface_mgr = g_interface_mgr:new(table_id)
	local m_errors_msg = errors_msg:new(m_interface_mgr)
	local m_rsp_msg = rsp_msg:new(m_interface_mgr)
	local m_logic = table_logic:new(table_id, m_interface_mgr, play_type)
    return {
		--玩家进入桌子
        enter = function(player_id)
           return m_logic:enter(player_id)
        end,
		--玩家离开桌子
		leave = function(player_id, reason)
			return m_logic:leave(player_id, reason)
		end,
		--玩家掉线
		disconnect = function(player_id)
			--log.error("disconnect:",player_id)
			return m_logic:disconnect(player_id)
		end,
		--玩家重连
		reconnect = function(player_id)
			--log.error("reconnect:",player_id)
			m_logic:reconnect(player_id)
		end,
		--消息分发处理
		handle = {
			--玩家请求游戏状态数据
			[PACK.chinese_chess_game.gameStateReq] = function(player_id, pack_id, pack_body)
				return m_logic:game_state_req(player_id, pack_id, pack_body)
			end,
			[PACK.chinese_chess_game.moveReq] = function (player_id, pack_id, pack_body)
				return m_logic:move_req(player_id, pack_id, pack_body)
			end
		},

		handle_end_rpc = function(player_id, pack_id, pack_body, rsp_session, handle_res)
			local ret, errcode, errmsg = tunpack(handle_res)
			if ret then	--rpc回复
				if ret ~= true and rsp_session then
					m_rsp_msg:rsp_msg(player_id, pack_id, ret, rsp_session)
				end
			else
				log.info("handle_end_rpc err >>> ", player_id, pack_id, ret, errcode, errmsg)
				m_errors_msg:errors(player_id, errcode, errmsg, pack_id, rsp_session)
			end
		end,
    }
end

return M