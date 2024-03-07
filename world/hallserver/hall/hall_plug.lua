
local log = require "skynet-fly.log"
local ws_pbnet_util = require "skynet-fly.utils.net.ws_pbnet_util"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local timer = require "skynet-fly.timer"
local errors_msg = require "common.msg.errors_msg"
local hall_msg = require "msg.hall_msg"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local player_agent = require "hall.player_agent"
local hall_global = require "hall.hall_global"

local assert = assert
local ipairs = ipairs
local pairs = pairs

local g_modules_list = {
	require "hall.match.match"
}

local g_interface_mgr = nil

local M = {}

local g_player_client = orm_table_client:new("player")

--指定解包函数
M.unpack = ws_pbnet_util.unpack
M.send = ws_pbnet_util.send
M.broadcast = ws_pbnet_util.broadcast
M.disconn_time_out = timer.minute                   --掉线一分钟就清理

local function heart_req(player_id, packname, pack_body)
	log.info("heart_req >>>> ", player_id, pack_body)
	player_agent.on_heart(player_id)
	return true
end

--初始化
function M.init(interface_mgr)
	--加载协议
	pb_netpack.load('../../common/proto')
	pb_netpack.load('./proto')
	g_interface_mgr = interface_mgr
	errors_msg = errors_msg:new(interface_mgr)
	hall_msg = hall_msg:new(interface_mgr)

	hall_global.set_hall_interface(interface_mgr)
	hall_global.set_hall_msg(hall_msg)
	g_interface_mgr:handle(".hallserver_hall.HeartReq", heart_req)

	--注册handle
	for _, m in ipairs(g_modules_list) do
		local handle = m.handle
		for packname,func in pairs(handle) do
			g_interface_mgr:handle(packname, func)
		end
	end

	--初始化
	for _, m in ipairs(g_modules_list) do
		m.init(interface_mgr)
	end
end

--连接成功
function M.connect(player_id)
	local player = g_player_client:get_one_entry(player_id)
	log.info("hall_plug connect ",player)
	player_agent.on_login(player_id)
	return {
		player_id = player_id,
		nickname = player.nickname,
	}
end

--掉线
function M.disconnect(player_id)
	log.info("hall_plug disconnect ",player_id)
end

--重连
function M.reconnect(player_id)
	local player = g_player_client:get_one_entry(player_id)
	log.info("hall_plug reconnect ",player_id, player)
	return {
		player_id = player_id,
		nickname = player.nickname,
	}
end

--登出
function M.goout(player_id)
	player_agent.on_loginout(player_id)
	log.info("hall_plug goout ",player_id)
end

M.register_cmd = {}

--设置CMD命令
for _, m in ipairs(g_modules_list) do
	local register_cmd = m.register_cmd
	for cmdname,func in pairs(register_cmd) do
		assert(not M.register_cmd[cmdname], "exists cmdname: " .. cmdname)
		M.register_cmd[cmdname] = func
	end
end

-- 客户端消息处理结束
function M.handle_end(player_id, packname, pack_body, ret, errcode, errmsg)
	log.info("handle_end >>> ", packname, ret, errcode, errmsg)
	if not ret then
		errors_msg:errors(player_id, errcode, errmsg, packname)
	end
end

return M