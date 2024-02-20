local log = require "log"
local ws_pbnet_util = require "ws_pbnet_util"
local pb_netpack = require "pb_netpack"
local errors_msg = require "errors_msg"
local errorcode = require "errorcode"
local timer = require "timer"

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
	pb_netpack.load('../../common/proto')
	pb_netpack.load('./proto')
	g_interface_mgr = interface_mgr
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
		return false,errorcode.NOT_LOGIN,"not login",packname
	end

	local player_id = pack_body.player_id
	if not player_id then
		log.error("req err ",pack_body)
		return false,errorcode.REQ_PARAM_ERR,"not player_id",packname
	end

	--成功返回玩家id
	return player_id
end

--登录失败
function M.login_failed(player_id,errcode,errmsg)
	errmsg:errors(errcode,errmsg)
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