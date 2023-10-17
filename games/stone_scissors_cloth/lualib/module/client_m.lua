local log = require "log"
local skynet = require "skynet"
local timer = require "timer"
local websocket = require "websocket"
local socket = require "socket"
local pb_netpack = require "pb_netpack"
local table_util = require "table_util"
local DOGIN_TYPE = require "DOGIN_TYPE"

local net_util = require "pbnet_util"

local CMD = {}

local g_config

local function dispatch(fd,packname,res)
	log.info("dispatch:",g_config.net_util,fd,packname,res)
end

local function connnect(handle)
	local fd = socket.open('127.0.0.1',8001)
	if not fd then
		log.error("connect faild ")
		return
	end

	local login_req = {
		account = g_config.account,
		password = g_config.password,
		player_id = g_config.player_id,
	}

	net_util.recv(fd,handle or dispatch)
	net_util.send(nil,fd,'.login.LoginReq',login_req)
	return fd
end

--玩游戏
local function player_game(login_res)
	login_res = login_res or {}
	local fd
	fd = connnect(function(_,packname,res)
		log.info("player_game:",fd,g_config.net_util,packname,res)

		if packname == '.game.NextDoingCast' then
			if res.doing_player_id ~= g_config.player_id then
				return
			end
			skynet.sleep(math.random(300,500))
			
			local doing_list = {DOGIN_TYPE.stone,DOGIN_TYPE.scissors,DOGIN_TYPE.cloth}

			local doing_type = doing_list[math.random(1,#doing_list)]
			net_util.send(nil,fd,'.game.DoingReq',{
				doing_type = doing_type,
			})

			log.info("发送操作:",g_config.player_id,doing_type)
		elseif packname == '.login.LoginRes' then
			log.info("登录成功:",res)
			net_util.send(nil,fd,'.hall.MatchReq',{player_id = 1})
		end
	end)

	return fd
end

function CMD.start(config)
	pb_netpack.load('./proto')
	g_config = config
	skynet.fork(function()
		player_game()
	end)
	
	return true
end

function CMD.exit()

end

return CMD