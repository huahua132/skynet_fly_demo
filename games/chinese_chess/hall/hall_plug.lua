
local log = require "skynet-fly.log"
local ws_pbnet_util = require "skynet-fly.utils.net.ws_pbnet_util"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local timer = require "skynet-fly.timer"
local errors_msg = require "common.msg.errors_msg"
local hall_msg = require "msg.hall_msg" 

local assert = assert

local g_interface_mgr = nil

local M = {}

--指定解包函数
M.unpack = ws_pbnet_util.unpack
M.send = ws_pbnet_util.send
M.broadcast = ws_pbnet_util.broadcast
M.disconn_time_out = timer.minute                   --掉线一分钟就清理

local function JoinReq(player_id,packname,pack_body)
	log.info("JoinReq:",player_id,packname,pack_body)
	local ok,errorcode,errormsg = g_interface_mgr:join_table(player_id, "default", pack_body.table_id)
	if ok then
		hall_msg:match_res(player_id,{table_id = errorcode})
	end
	return ok,errorcode,errormsg
end

--初始化
function M.init(interface_mgr)
	--加载协议
	pb_netpack.load('../../common/proto')
	pb_netpack.load('./proto')
	g_interface_mgr = interface_mgr
	hall_msg = hall_msg:new(interface_mgr)
	errors_msg = errors_msg:new(interface_mgr)
	g_interface_mgr:handle('.chinese_chess_hall.JoinReq', JoinReq)
end

--连接成功
function M.connect(player_id)
	log.info("hall_plug connect ",player_id)
	return {
		isreconnect = 0
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
		isreconnect = 1
	}
end

--登出
function M.goout(player_id)
	log.info("hall_plug goout ",player_id)
end

-- 客户端消息处理结束
function M.handle_end(player_id, packname, pack_body, ret, errcode, errmsg)
	if not ret then
		log.info("handle_end err >>> ", packname, ret, errcode, errmsg)
		errors_msg:errors(player_id, errcode, errmsg, packname)
	end
end

return M