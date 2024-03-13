
local log = require "skynet-fly.log"
local ws_pbnet_util = require "skynet-fly.utils.net.ws_pbnet_util"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local timer = require "skynet-fly.timer"
local errors_msg = require "common.msg.errors_msg"
local skynet = require "skynet"

local assert = assert
local ipairs = ipairs
local pairs = pairs

local g_modules_list = {
	require "hall.player.player",
	require "hall.match.match",
	require "hall.item.item"
}

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
	pb_netpack.load('../../commonlualib/common/proto')
	pb_netpack.load('./proto')
	g_interface_mgr = interface_mgr
	errors_msg = errors_msg:new(interface_mgr)

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

local function on_login(player_id)
	for _, m in ipairs(g_modules_list) do
		if m.on_login then
			m.on_login(player_id)
		end
	end
end

--连接成功
function M.connect(player_id)
	skynet.fork(on_login, player_id)
	return {
		player_id = player_id,
	}
end

--掉线
function M.disconnect(player_id)
	for _, m in ipairs(g_modules_list) do
		if m.on_disconnect then
			m.on_disconnect(player_id)
		end
	end
end

local function on_reconnect(player_id)
	for _, m in ipairs(g_modules_list) do
		if m.on_reconnect then
			m.on_reconnect(player_id)
		end
	end
end
--重连
function M.reconnect(player_id)
	skynet.fork(on_reconnect, player_id)
	return {
		player_id = player_id,
	}
end

--登出
function M.goout(player_id)
	for _, m in ipairs(g_modules_list) do
		if m.on_loginout then
			m.on_loginout(player_id)
		end
	end
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
	if not ret then
		log.info("handle_end err >>> ", packname, ret, errcode, errmsg)
		errors_msg:errors(player_id, errcode, errmsg, packname)
	end
end

return M