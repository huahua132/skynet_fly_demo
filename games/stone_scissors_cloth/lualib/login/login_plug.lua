local log = require "log"
local pbnet_util = require "pbnet_util"
local pb_netpack = require "pb_netpack"
local timer = require "timer"

local assert = assert
local x_pcall = x_pcall

local M = {}

--登录检测的超时时间
M.time_out = timer.second * 5

function M.init()
	--加载pb文件
	pb_netpack.load('./proto')
end

--解包函数
M.unpack = pbnet_util.unpack

--登录检测函数 packname,req是解包函数返回的
--登入成功后返回玩家id
function M.check(gate,fd,packname,req)
	if not packname then
		log.error("unpack err ",packname,req)
		return
	end
	--检测是不是登录请求
	if packname ~= '.login.LoginReq' then
		log.error("login_check msg err ",fd)
		return
	end

	local player_id = req.player_id
	if not player_id then
		log.error("req err ",fd,req)
		return
	end

	--检测密码是否正确
	if req.password ~= '123456' then
		log.error("login err ",req)
		return
	end

	--成功返回玩家id
	return player_id
end

--登录失败
function M.login_failed(gate,fd,player_id,errcode,errmsg)
	
end

--登录成功
function M.login_succ(gate,fd,player_id,login_res)

end

--登出回调
function M.login_out(player_id)
	log.info("login_out ",player_id)
end

--掉线回调
function M.disconnect(gate,fd,player_id)
	log.info('disconnect:',fd,player_id)
end

--正在登录中
function M.logining(gate,fd,player_id)

end

--重复登录
function M.repeat_login(gate,fd,player_id)

end

return M