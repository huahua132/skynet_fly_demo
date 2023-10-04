
local log = require "log"
local ws_pbnet_util = require "ws_pbnet_util"
local pb_netpack = require "pb_netpack"

local assert = assert

local M = {}

--指定解包函数
M.unpack = ws_pbnet_util.unpack

--初始化
function M.init()
	--加载协议
	pb_netpack.load("./proto")
end

--处理请求
function M.dispatch(gate,fd,packname,req,CMD)
	--返回false转发给room服务
	return false
end

--连接成功
function M.connect(gate,fd,player_id)
	log.info("hall_plug connect ",fd,player_id)
end

--掉线
function M.disconnect(gate,fd,player_id)
	log.info("hall_plug disconnect ",fd,player_id)
end

--重连
function M.reconnect(gate,fd,player_id)
	log.info("hall_plug reconnect ",fd,player_id)
end

--登出
function M.goout(player_id)
	log.info("hall_plug goout ",player_id)
end

return M