local skynet = require "skynet"
local contriner_launcher = require "skynet-fly.contriner.contriner_launcher"

skynet.start(function()
	skynet.error("start chinese_chess>>>>>>>>>>>>>>>>>")
	contriner_launcher.run()
	--启动集群连接入口
	skynet.uniqueservice("frpc_server")
	--启动room_game_login 登录服务
	skynet.uniqueservice("room_game_login")

	skynet.call('.logger','lua','add_hook','common.log_hook')

	skynet.exit()
end)