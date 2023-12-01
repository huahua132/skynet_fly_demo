local log = require "log"
local pbnet_util = require "pbnet_util"
local pb_netpack = require "pb_netpack"
local timer = require "timer"

local assert = assert
local x_pcall = x_pcall

local M = {}

local g_instance = nil
--登录检测的超时时间
M.time_out = timer.second * 5

function M.init(instance)
	--加载pb文件
	pb_netpack.load('./proto')
	g_instance = instance
end

--解包函数
M.unpack = pbnet_util.unpack
--指定发包函数
M.send = pbnet_util.send

M.broadcast = pbnet_util.broadcast

--登录检测函数 packname,pack_body是解包函数返回的
--登入成功后返回玩家id
function M.check(packname,pack_body)
	if not packname then
		log.error("unpack err ",packname,pack_body)
		return
	end
	--检测是不是登录请求
	if packname ~= '.login.LoginReq' then
		log.error("login_check msg err ",packname)
		return
	end

	local player_id = pack_body.player_id
	if not player_id then
		log.error("req err ",pack_body)
		return
	end

	--检测密码是否正确
	if pack_body.password ~= '123456' then
		log.error("login err ",pack_body)
		return
	end

	--成功返回玩家id
	return player_id
end

--登录失败
function M.login_failed(player_id,errcode,errmsg)
	
end

--登录成功
function M.login_succ(player_id,login_res)
	g_instance:send_msg(player_id,'.login.LoginRes',login_res)
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

end

--重复登录
function M.repeat_login(player_id)

end

return M