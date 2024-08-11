local skynet = require "skynet"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local ws_pbnet_util = require "skynet-fly.utils.net.ws_pbnet_util"
local log = require "skynet-fly.log"
local module_cfg = require "skynet-fly.etc.module_info".get_cfg()
local errors_msg = require "common.msg.errors_msg"
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

local M = {}

local g_interface_mgr = nil

function M.init(interface_mgr)
	g_interface_mgr = interface_mgr
	assert(module_cfg.table_conf.player_num,"not player_num")
	pb_netpack.load('../../commonlualib/gamecommon/proto')
	pb_netpack.load('./proto')
end

M.ws_send = ws_pbnet_util.send
M.ws_broadcast = ws_pbnet_util.broadcast

--游戏桌子创建者
function M.table_creator(table_id)
	local m_errors_msg = errors_msg:new(g_interface_mgr)
	local m_logic = table_logic:new(table_id, g_interface_mgr)
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
			['.chinese_chess_game.gameStateReq'] = function(player_id, packname, pack_body)
				return m_logic:game_state_req(player_id, packname, pack_body)
			end,
			['.chinese_chess_game.moveReq'] = function (player_id, packname, pack_body)
				return m_logic:move_req(player_id, packname, pack_body)
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