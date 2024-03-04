local skynet = require "skynet"
local contriner_launcher = require "skynet-fly.contriner.contriner_launcher"
local log = require "skynet-fly.log"

skynet.start(function()
	skynet.error("start centerserver>>>>>>>>>>>>>>>>>")

	contriner_launcher.run()
	--启动集群连接入口
	skynet.uniqueservice("cluster_server")
	skynet.call('.logger','lua','add_hook','common.log_hook')
	skynet.exit()
end)