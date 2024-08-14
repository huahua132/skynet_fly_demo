local log = require "skynet-fly.log"
local ws_pbnet_byid = require "skynet-fly.utils.net.ws_pbnet_byid"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local errorcode = require "common.enum.errorcode"
local timer = require "skynet-fly.timer"
local contriner_client = require "skynet-fly.client.contriner_client"
local pack_helper = require "common.pack_helper"
local module_info = require "skynet-fly.etc.module_info"

contriner_client:register("token_m")

do
	--加载pb文件
	pb_netpack.load('../../commonlualib/common/proto')

	--协议码 协议消息名建立映射关系
	pack_helper.set_pack_id_names {
		"../../commonlualib/common/enum/",
	}
end

local assert = assert

local errors_msg = require "common.msg.errors_msg"
local login_msg = require "common.msg.login_msg"
local g_login_req_pack_id = assert(login_msg.login_req_pack_id, "not exists g_login_req_pack_id")

local M = {}

--登录检测的超时时间
M.time_out = timer.second * 5
--解包函数
M.ws_unpack = ws_pbnet_byid.unpack
--发包函数
M.ws_send = ws_pbnet_byid.send
--广播函数
M.ws_broadcast = ws_pbnet_byid.broadcast

function M.init(interface_mgr)
	login_msg = login_msg:new(interface_mgr)
	errors_msg = errors_msg:new(interface_mgr)
end

--登录检测函数 pack_id,pack_body是解包函数返回的
--登入成功后返回玩家id
function M.check(pack_id,pack_body)
	if not pack_id then
		log.error("unpack err ",pack_id,pack_body)
		return false,errorcode.PROTOCOL_ERR,"PROTOCOL_ERR"
	end
	--检测是不是登录请求
	if pack_id ~= g_login_req_pack_id then
		log.error("login_check msg err ",pack_id)
		return false,errorcode.NOT_LOGIN,"not login"
	end

	local player_id = pack_body.player_id
	local token = pack_body.token
	if not player_id or not token then
		log.error("login check err ",pack_body)
		return false,errorcode.REQ_PARAM_ERR,"not player_id"
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
function M.login_failed(player_id, errcode, errmsg)
	errors_msg:errors(player_id, errcode, errmsg, g_login_req_pack_id)
end

--登录成功
function M.login_succ(player_id,login_res)
	--log.info("login_succ:",player_id,login_res)
	login_msg:login_res(player_id,login_res)
end

--登出回调
function M.login_out(player_id)
	--log.info("login_out ",player_id)
end

--掉线回调
function M.disconnect(player_id)
	--log.info('disconnect:',player_id)
end

--正在登录中
function M.logining(player_id)
	log.info("logining >>>>> ", player_id)
end

--重复登录
function M.repeat_login(player_id)
	errors_msg:errors(player_id,errorcode.REPAET_LOGIN,"repeat_login")
end

return M