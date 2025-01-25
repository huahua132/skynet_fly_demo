local log = require "skynet-fly.log"
local ws_pbnet_byrpc = require "skynet-fly.utils.net.ws_pbnet_byrpc"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local errorcode = require "common.enum.errorcode"
local timer = require "skynet-fly.timer"
local contriner_client = require "skynet-fly.client.contriner_client"
local pack_helper = require "common.pack_helper"
local module_info = require "skynet-fly.etc.module_info"

contriner_client:register("token_m")

do
	--加载pb文件
	pb_netpack.load('../../commonlualib/protos/common')

	--协议码 协议消息名建立映射关系
	pack_helper.set_pack_id_names()
end

local assert = assert

local errors_msg = require "common.msg.errors_msg"
local rsp_msg = require "common.msg.rsp_msg"
local PACK = require "common.pack_helper".PACK

local M = {}

--登录检测的超时时间
M.time_out = timer.second * 5
--解包函数
M.ws_unpack = ws_pbnet_byrpc.unpack
--发包函数
M.ws_send = ws_pbnet_byrpc.send
--广播函数
M.ws_broadcast = ws_pbnet_byrpc.broadcast
--跳转新到大厅
M.is_jump_new = true
--单次跳转数量
M.jump_once_cnt = 100
--尝试跳转间隔
M.jump_inval_time = 5
--rpc打包工具
M.rpc_pack = require "skynet-fly.utils.net.rpc_server"

local g_online_map = {}

function M.init(interface_mgr)
	rsp_msg = rsp_msg:new(interface_mgr)
	errors_msg = errors_msg:new(interface_mgr)
end

--登录检测函数 pack_id,pack_body是解包函数返回的
--登入成功后返回玩家id
function M.check(pack_id, pack_body)
	if not pack_id then
		log.error("unpack err ", pack_id, pack_body)
		return false, errorcode.PROTOCOL_ERR, "PROTOCOL_ERR"
	end
	--检测是不是登录请求
	if pack_id ~= PACK.login.LoginReq then
		log.error("login_check msg err ",pack_id)
		return false, errorcode.NOT_LOGIN, "not login"
	end

	local player_id = pack_body.player_id
	local token = pack_body.token
	if not player_id or not token then
		log.error("login check err ",pack_body)
		return false, errorcode.REQ_PARAM_ERR, "not player_id"
	end

	--校验token
	if not contriner_client:instance("token_m"):mod_call("auth_token", player_id, token) then
		log.error("token err ", pack_body)
		return false, errorcode.TOKEN_ERR, "TOKEN err"
	end
	--成功返回玩家id
	return player_id
end

--登录失败
function M.login_failed(player_id, errcode, errmsg, packid, rsp_session, fd)
	log.info("login_failed >>> ", player_id, errcode, errmsg, packid, rsp_session, fd)
	errors_msg:errors(player_id, errcode, errmsg, packid, rsp_session, fd)
end

--登录成功
function M.login_succ(player_id, login_res, packid, rsp_session)
	--log.info("login_succ:",player_id, login_res)
	g_online_map[player_id] = true
	rsp_msg:rsp_msg(player_id, packid, login_res, rsp_session)
end

--登出回调
function M.login_out(player_id)
	g_online_map[player_id] = nil
	--log.info("login_out ",player_id)
end

--掉线回调
function M.disconnect(player_id)
	--log.info('disconnect:',player_id)
end

--正在登录中
function M.logining(player_id, packid, rsp_session, fd)
	log.info("logining >>>>> ", player_id, packid, fd)
	errors_msg:errors(player_id, errorcode.LOGINING, "logining", packid, rsp_session, fd)
end

--重复登录
function M.repeat_login(player_id, packid, rsp_session)
	errors_msg:errors(player_id, errorcode.REPAET_LOGIN, "repeat_login", packid, rsp_session)
end

local CMD = {}

--查询玩家是否在线
function CMD.is_onlines(player_list)
	local ret_map = {}
	for i = 1,#player_list do
		local player_id = player_list[i]
		if g_online_map[player_id] then
			ret_map[player_id] = true
		end
	end

	return ret_map
end

--查询单个玩家是否在线
function CMD.is_online(player_id)
	return g_online_map[player_id]
end

--获取在线表
function CMD.get_online_map()
	return g_online_map
end

M.register_cmd = CMD

return M