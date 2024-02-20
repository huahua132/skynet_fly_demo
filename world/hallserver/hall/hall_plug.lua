
local log = require "log"
local ws_pbnet_util = require "ws_pbnet_util"
local pb_netpack = require "pb_netpack"
local timer = require "timer"
local errors_msg = require "errors_msg"
local hall_cmd = require "hall_cmd"

local assert = assert

local g_interface_mgr = nil

local M = {}

--指定解包函数
M.unpack = ws_pbnet_util.unpack
M.send = ws_pbnet_util.send
M.broadcast = ws_pbnet_util.broadcast
M.disconn_time_out = timer.minute                   --掉线一分钟就清理

--初始化
function M.init(interface_mgr)
	--加载协议
	pb_netpack.load('../../common/proto')
	pb_netpack.load('./proto')
	g_interface_mgr = interface_mgr
	errors_msg = errors_msg:new(interface_mgr)
end

--连接成功
function M.connect(player_id)
	log.info("hall_plug connect ",player_id)
	return {
		player_id = player_id
	}
end

--掉线
function M.disconnect(player_id)
	log.info("hall_plug disconnect ",player_id)
end

--重连
function M.reconnect(player_id)
	log.info("hall_plug reconnect ",player_id)
	return {
		player_id = player_id
	}
end

--登出
function M.goout(player_id)
	log.info("hall_plug goout ",player_id)
end

M.register_cmd = {
    
}

return M