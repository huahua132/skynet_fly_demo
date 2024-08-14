
local log = require "skynet-fly.log"
local ws_pbnet_byid = require "skynet-fly.utils.net.ws_pbnet_byid"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local timer = require "skynet-fly.timer"
local skynet = require "skynet"
local module_info = require "skynet-fly.etc.module_info"
local pack_helper = require "common.pack_helper"
do
	--加载协议
	local cfg = module_info.get_cfg()
	if cfg.is_game then
		pb_netpack.load('../../commonlualib/gamecommon/proto')
		pack_helper.set_pack_id_names {
			"../../commonlualib/gamecommon/enum/",
		}
	end

	pb_netpack.load('../../commonlualib/common/proto')
	pb_netpack.load('./proto')

	--协议码 协议消息名建立映射关系
	pack_helper.set_pack_id_names {
		"../../commonlualib/common/enum/",
		"./enum/",
	}
end

local errors_msg = require "common.msg.errors_msg"
local g_modules_list = require "hall.hall"

local assert = assert
local ipairs = ipairs
local pairs = pairs

local g_interface_mgr = nil

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
		isreconnect = 0,
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
		isreconnect = 1,
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
		log.info("handle_end err >>> ", pack_id, ret, errcode, errmsg)
		errors_msg:errors(player_id, errcode, errmsg, pack_id)
	end
end

-- 离开房间回调
function M.leave_table(player_id, table_name, table_id)
	--离开房间说明对局结束了，就直接踢掉吧
	skynet.fork(g_interface_mgr.goout, g_interface_mgr, player_id)
end

return M