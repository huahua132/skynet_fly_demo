local skynet = require "skynet"
local contriner_launcher = require "contriner_launcher"
local log = require "log"

skynet.start(function()
	skynet.error("start hallserver>>>>>>>>>>>>>>>>>")

	contriner_launcher.run()
	--启动集群连接入口
	skynet.uniqueservice("cluster_server")

    --登录服
    skynet.uniqueservice("room_game_login")

    skynet.call('.logger','lua','add_hook','log_hook')

    skynet.exit()
end)