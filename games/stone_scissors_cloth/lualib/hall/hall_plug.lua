
local log = require "log"
local pbnet_util = require "pbnet_util"
local pb_netpack = require "pb_netpack"
local errors_msg = require "errors_msg"
local timer = require "timer"

local assert = assert

local g_instance = nil

local function match_table(player_id, packname, pack_body)
	local ok,errorcode,errormsg = g_instance:match_join_table(player_id,pack_body.table_name)
	if not ok then
		log.error("dispatch err ",errorcode,errormsg)
		errors_msg:errors(player_id,errorcode,errormsg,packname)
	else
		g_instance:send_msg(player_id,'.hall.MatchRes',{table_id = errorcode})
	end
end

local M = {}

--指定解包函数
M.unpack = pbnet_util.unpack
--指定发包函数
M.send = pbnet_util.send

M.broadcast = pbnet_util.broadcast

M.disconn_time_out = timer.minute

--初始化
function M.init(instance)
	--加载协议
	g_instance = instance
	g_instance:handle('.hall.MatchReq',match_table)
	pb_netpack.load("./proto")

	errors_msg = errors_msg:new()
end

--连接成功
function M.connect(player_id)
	log.info("hall_plug connect ",player_id)
	return {
		player_id = player_id,
		table_id = g_instance:get_table_id(player_id),
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
		player_id = player_id,
		table_id = g_instance:get_table_id(player_id),
	}
end

--登出
function M.goout(player_id)
	log.info("hall_plug goout ",player_id)
end

return M