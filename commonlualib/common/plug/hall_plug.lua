
local log = require "skynet-fly.log"
local ws_pbnet_byrpc = require "skynet-fly.utils.net.ws_pbnet_byrpc"
local timer = require "skynet-fly.timer"
local skynet = require "skynet"
local errors_msg = require "common.msg.errors_msg"
local rsp_msg = require "common.msg.rsp_msg"
local g_modules_list = require "hall.hall"
local pack_helper = require "common.pack_helper"
local table_util = require "skynet-fly.utils.table_util"
local switch_helper = require "common.switch_helper"
local white_helper = require "common.white_helper"
local queue_helper = require "common.queue_helper"
local SERVER_SWITCH_STATUS = require "common.enum.SERVER_SWITCH_STATUS"
local errorcode = require "common.enum.errorcode"

local assert = assert
local ipairs = ipairs
local pairs = pairs
local x_pcall = x_pcall
local type = type
local string = string
local tinsert = table.insert
local tunpack = table.unpack

local g_interface_mgr = nil
local g_login_funcs = {}
local g_disconnect_funcs = {}
local g_reconnect_funcs = {}
local g_loginout_funcs = {}

local g_before_funcs = {}
local g_before_id_funcs = {}
local g_switch_ignore_map = {}		--开关忽略的消息
local g_gm_cmd_map = {}

local M = {}

--指定解包函数
M.ws_unpack = ws_pbnet_byrpc.unpack
M.ws_send = ws_pbnet_byrpc.send
M.ws_broadcast = ws_pbnet_byrpc.broadcast
M.disconn_time_out = timer.minute                   --掉线一分钟就清理
M.rpc_pack = require "skynet-fly.utils.net.rpc_server"

--消息前置处理函数
local function msg_handle_pre(func)
	return function(player_id, pack_id, pack_body)
		--加入队列执行
		return queue_helper.multi_player_func(player_id, func, player_id, pack_id, pack_body)
	end
end

--CMD消息前置处理函数
local function cmd_handle_pre(func)
	return function(key, ...)
		--加入队列执行
		local k_type = type(key)
		if k_type == 'number' then
			return queue_helper.multi_player_func(key, func, key, ...)
		elseif k_type == 'nil' then	--不进入队列
			return func(key, ...)
		else
			return queue_helper.unique(func, key, ...)
		end
	end
end

--初始化
function M.init(interface_mgr)
	g_interface_mgr = interface_mgr
	errors_msg = errors_msg:new(interface_mgr)
	rsp_msg = rsp_msg:new(interface_mgr)

	--注册handle
	for _, m in ipairs(g_modules_list) do
		local handle = m.handle
		if handle then
			for pack_id,func in pairs(handle) do
				g_interface_mgr:handle(pack_id, msg_handle_pre(func))
			end
		end
		local switch_ignores = m.switch_ignores
		if switch_ignores then
			for pack_id in pairs(switch_ignores) do
				g_switch_ignore_map[pack_id] = true
			end
		end
	end

	--初始化
	for _, m in ipairs(g_modules_list) do
		if m.init then
			skynet.fork(function()
				m.init(interface_mgr)
			end)
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
		if m.on_msg_before then
			tinsert(g_before_funcs, m.on_msg_before)
		end
		if m.on_msg_before_id then
			for id, func in pairs(m.on_msg_before_id) do
				if not g_before_id_funcs[id] then
					g_before_id_funcs[id] = {}
				end
				tinsert(g_before_id_funcs[id], func)
			end
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
	g_interface_mgr:queue(player_id, queue_helper.multi_player_func, player_id, on_login, player_id, is_jump_join)
end

--连接成功
function M.connect(player_id, is_jump_join)
	skynet.fork(queue_on_login, player_id, is_jump_join)
	return {
		isreconnect = 0,
	}
end

local function on_disconnect(player_id)
	for i = 1, #g_disconnect_funcs do
		local func = g_disconnect_funcs[i]
		local isok, err = x_pcall(func, player_id)
		if not isok then
			log.error("disconnect err ", player_id, err)
		end
	end
end

--掉线
function M.disconnect(player_id)
	g_interface_mgr:queue(player_id, queue_helper.multi_player_func, player_id, on_disconnect, player_id)
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
	g_interface_mgr:queue(player_id, queue_helper.multi_player_func, player_id, on_reconnect, player_id)
end

--重连
function M.reconnect(player_id)
	skynet.fork(queue_on_reconnect, player_id)
	return {
		isreconnect = 1,
	}
end

local function on_goout(player_id, is_jump_exit)
	for i = 1, #g_loginout_funcs do
		local func = g_loginout_funcs[i]
		local isok, err = x_pcall(func, player_id, is_jump_exit)
		if not isok then
			log.error("reconnect err ", player_id, is_jump_exit, err)
		end
	end
end

--登出
function M.goout(player_id, is_jump_exit)
	g_interface_mgr:queue(player_id, queue_helper.multi_player_func, player_id, on_goout, player_id, is_jump_exit)
end

local CMD = {}
--注册gm 命令
local function reg_gm_cmd(cmd_name, func, help_des)
	assert(not g_gm_cmd_map[cmd_name], "exists cmd_name:" .. cmd_name)
	assert(type(func) == 'function', "not func")
	assert(type(help_des) == 'string', "not help_des")				--描述信息
	if cmd_name ~= 'help' then
		g_gm_cmd_map[cmd_name] = {
			func = cmd_handle_pre(func),
			help_des = help_des
		}
	else
		g_gm_cmd_map[cmd_name] = {
			func = func,
			help_des = help_des
		}
	end
end

--help 命令
reg_gm_cmd('help', function(find_name)
	local res_list = {}
	for cmd_name, info in table_util.sort_ipairs_byk(g_gm_cmd_map) do
		if cmd_name ~= 'help' and (not find_name or find_name == "" or string.find(cmd_name, find_name, nil, true)) then
			tinsert(res_list, {
				cmd_name = cmd_name,
				help_des = info.help_des,
			})
		end
	end
	
	return res_list
end, "help cmd")

--gm 命令
function CMD.gm_cmd(cmd_name, ...)
	local gm = g_gm_cmd_map[cmd_name]
	if not gm then
		return nil, "cmd_name not exists:" .. cmd_name
	end

	local func = gm.func
	return func(...)
end

M.register_cmd = CMD

do
	--设置CMD命令
	for _, m in ipairs(g_modules_list) do
		local register_cmd = m.register_cmd
		if register_cmd then
			for cmdname,func in pairs(register_cmd) do
				assert(not M.register_cmd[cmdname], "exists cmdname: " .. cmdname)
				M.register_cmd[cmdname] = cmd_handle_pre(func)
			end
		end
	end

	--设置GM命令
	for _, m in ipairs(g_modules_list) do
		local gm_cmd = m.gm_cmd
		if gm_cmd then
			for cmdname, info in pairs(gm_cmd) do
				reg_gm_cmd(cmdname, info.func, info.help_des)
			end
		end
	end
end

--客户端消息前置处理
function M.handle_before(player_id, pack_id, pack_body, rsp_session)

	if not g_switch_ignore_map[pack_id] then
		--判定开关
		local switch = switch_helper.get_switch()
		if switch == SERVER_SWITCH_STATUS.CLOSE or switch == SERVER_SWITCH_STATUS.CLOSE_JOIN then	--关闭状态
			errors_msg:errors(player_id, errorcode.SERVER_CLOSE, "SERVER_CLOSE", pack_id, rsp_session)
			return false
		elseif switch == SERVER_SWITCH_STATUS.WHITE then
			if not white_helper.is_white(player_id) then
				errors_msg:errors(player_id, errorcode.SERVER_CLOSE, "SERVER_CLOSE", pack_id, rsp_session)
				return false
			end
		end
	end

	local ret, errcode, errmsg
	for i = 1, #g_before_funcs do
		local func = g_before_funcs[i]
		ret, errcode, errmsg = func(player_id, pack_id, pack_body)
		if not ret then
			errors_msg:errors(player_id, errcode, errmsg, pack_id, rsp_session)
			return false
		end
	end

	local id = pack_helper.get_id_subid(pack_id)
	local funcs = g_before_id_funcs[id]
	if funcs then
		for i = 1, #funcs do
			local func = funcs[i]
			ret, errcode, errmsg = func(player_id, pack_id, pack_body)
			if not ret then
				errors_msg:errors(player_id, errcode, errmsg, pack_id, rsp_session)
				return false
			end
		end
	end

	return true
end

-- 客户端消息处理结束
function M.handle_end_rpc(player_id, pack_id, pack_body, rsp_session, handle_res)
	local ret, errcode, errmsg = tunpack(handle_res)
	if ret then	--rpc回复
		if ret ~= true and rsp_session then
			rsp_msg:rsp_msg(player_id, pack_id, ret, rsp_session)
		end
	else
		log.info("handle_end_rpc err >>> ", player_id, pack_id, ret, errcode, errmsg)
		errors_msg:errors(player_id, errcode, errmsg, pack_id, rsp_session)
	end
end

--进入房间回调
function M.join_table(player_id, table_name, table_id)

end

-- 离开房间回调
function M.leave_table(player_id, table_name, table_id)

end

return M