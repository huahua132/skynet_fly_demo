
local log = require "skynet-fly.log"
local ws_pbnet_byid = require "skynet-fly.utils.net.ws_pbnet_byid"
local timer = require "skynet-fly.timer"
local skynet = require "skynet"
local errors_msg = require "common.msg.errors_msg"
local g_modules_list = require "hall.hall"

local assert = assert
local ipairs = ipairs
local pairs = pairs
local x_pcall = x_pcall
local tinsert = table.insert

local g_interface_mgr = nil
local g_login_funcs = {}
local g_disconnect_funcs = {}
local g_reconnect_funcs = {}
local g_loginout_funcs = {}

local M = {}

--指定解包函数
M.ws_unpack = ws_pbnet_byid.unpack
M.ws_send = ws_pbnet_byid.send
M.ws_broadcast = ws_pbnet_byid.broadcast
M.disconn_time_out = timer.minute                   --掉线一分钟就清理

--初始化
function M.init(interface_mgr)
	g_interface_mgr = interface_mgr
	errors_msg = errors_msg:new(interface_mgr)

	--注册handle
	for _, m in ipairs(g_modules_list) do
		local handle = m.handle
		for pack_id,func in pairs(handle) do
			g_interface_mgr:handle(pack_id, func)
		end
	end

	--初始化
	for _, m in ipairs(g_modules_list) do
		if m.init then
			m.init(interface_mgr)
		end
		if m.on_login then
			tinsert(g_login_funcs, m.on_login)
		end
		if m.on_disconnect then
			tinsert(g_disconnect_funcs, m.on_disconnect)
		end
		if m.on_reconnect then
			tinsert(g_reconnect_funcs, m.on_reconnect)
		end
		if m.on_loginout then
			tinsert(g_loginout_funcs, m.on_loginout)
		end
	end
end

local function on_login(player_id, is_jump_join)
	for i = 1, #g_login_funcs do
		local func = g_login_funcs[i]
		local isok, err = x_pcall(func, player_id, is_jump_join)
		if not isok then
			log.error("login err ", player_id, is_jump_join, err)
		end
	end
end

local function queue_on_login(player_id, is_jump_join)
	g_interface_mgr:queue(player_id, on_login, player_id, is_jump_join)
end

--连接成功
function M.connect(player_id, is_jump_join)
	skynet.fork(queue_on_login, player_id, is_jump_join)
	return {
		isreconnect = 0,
	}
end

--掉线
function M.disconnect(player_id)
	for i = 1, #g_disconnect_funcs do
		local func = g_disconnect_funcs[i]
		local isok, err = x_pcall(func, player_id)
		if not isok then
			log.error("disconnect err ", player_id, err)
		end
	end
end

local function on_reconnect(player_id)
	for i = 1, #g_reconnect_funcs do
		local func = g_reconnect_funcs[i]
		local isok, err = x_pcall(func, player_id)
		if not isok then
			log.error("reconnect err ", player_id, err)
		end
	end
end

local function queue_on_reconnect(player_id)
	g_interface_mgr:queue(player_id, on_reconnect, player_id)
end

--重连
function M.reconnect(player_id)
	skynet.fork(queue_on_reconnect, player_id)
	return {
		isreconnect = 1,
	}
end

--登出
function M.goout(player_id, is_jump_exit)
	for i = 1, #g_loginout_funcs do
		local func = g_loginout_funcs[i]
		local isok, err = x_pcall(func, player_id, is_jump_exit)
		if not isok then
			log.error("reconnect err ", player_id, is_jump_exit, err)
		end
	end
end

M.register_cmd = {}

do
	--设置CMD命令
	for _, m in ipairs(g_modules_list) do
		local register_cmd = m.register_cmd
		for cmdname,func in pairs(register_cmd) do
			assert(not M.register_cmd[cmdname], "exists cmdname: " .. cmdname)
			M.register_cmd[cmdname] = func
		end
	end
end

-- 客户端消息处理结束
function M.handle_end(player_id, pack_id, pack_body, ret, errcode, errmsg)
	if not ret then
		log.info("handle_end err >>> ", player_id, pack_id, ret, errcode, errmsg)
		errors_msg:errors(player_id, errcode, errmsg, pack_id)
	end
end

-- 离开房间回调
function M.leave_table(player_id, table_name, table_id)
	--离开房间说明对局结束了，就直接踢掉吧
	skynet.fork(g_interface_mgr.goout, g_interface_mgr, player_id)
end

return M