local log = require "skynet-fly.log"
local ws_pbnet_util = require "skynet-fly.utils.net.ws_pbnet_util"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local errors_msg = require "common.msg.errors_msg"
local login_msg = require "msg.login_msg"
local errorcode = require "common.enum.errorcode"
local timer = require "skynet-fly.timer"
local contriner_client = require "skynet-fly.client.contriner_client"

contriner_client:register("token_m")

local assert = assert
local x_pcall = x_pcall

local g_interface_mgr = nil   --接口

local M = {}

--登录检测的超时时间
M.time_out = timer.second * 5
--解包函数
M.unpack = ws_pbnet_util.unpack
--发包函数
M.send = ws_pbnet_util.send

M.broadcast = ws_pbnet_util.broadcast

function M.init(interface_mgr)
	--加载pb文件
	pb_netpack.load('../../commonlualib/common/proto')
	pb_netpack.load('./proto')
	g_interface_mgr = interface_mgr
	login_msg = login_msg:new(interface_mgr)
	errors_msg = errors_msg:new(interface_mgr)
end

--登录检测函数 packname,pack_body是解包函数返回的
--登入成功后返回玩家id
function M.check(packname,pack_body)
	if not packname then
		log.error("unpack err ",packname,pack_body)
		return false,errorcode.PROTOCOL_ERR,"PROTOCOL_ERR"
	end
	--检测是不是登录请求
	if packname ~= '.chinese_chess_login.LoginReq' then
		log.error("login_check msg err ",packname)
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
function M.login_failed(player_id,errcode,errmsg)
	errors_msg:errors(player_id,errcode,errmsg)
end

--登录成功
function M.login_succ(player_id,login_res)
	log.info("login_succ:",player_id,login_res)
	login_msg:login_res(player_id,login_res)
end

--登出回调
function M.login_out(player_id)
	log.info("login_out ",player_id)
end

--掉线回调
function M.disconnect(player_id)
	log.info('disconnect:',player_id)
end

--正在登录中
function M.logining(player_id)
	errors_msg:errors(player_id,errorcode.LOGINING,"logining please waiting...")
end

--重复登录
function M.repeat_login(gate,fd,player_id)
	errors_msg:errors(player_id,errorcode.REPAET_LOGIN,"repeat_login")
end

return M