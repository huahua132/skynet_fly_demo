
local log = require "log"
local ws_pbnet_util = require "ws_pbnet_util"
local pb_netpack = require "pb_netpack"
local timer = require "timer"
local errors_msg = require "errors_msg"
local hall_msg = require "hall_msg" 

local assert = assert

local g_interface_mgr = nil

local M = {}

--指定解包函数
M.unpack = ws_pbnet_util.unpack
M.send = ws_pbnet_util.send
M.disconn_time_out = timer.minute                   --掉线一分钟就清理

local function matchReq(player_id,packname,pack_body)
	log.info("matchReq:",player_id,packname,pack_body)
	local ok,errorcode,errormsg = g_interface_mgr:match_join_table(player_id,pack_body.table_name)
	if not ok then
		log.error("dispatch err ",errorcode,errormsg)
		errors_msg:errors(player_id,errorcode,errormsg,packname)
	else
		hall_msg:match_res(player_id,{table_id = errorcode})
	end
end

--初始化
function M.init(interface_mgr)
	--加载协议
	pb_netpack.load('../../common/proto')
	pb_netpack.load('./proto')
	g_interface_mgr = interface_mgr
	hall_msg = hall_msg:new(interface_mgr)
	errors_msg = errors_msg:new(interface_mgr)
	g_interface_mgr:handle('.chinese_chess_hall.matchReq',matchReq)
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

return M