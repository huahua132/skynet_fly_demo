local skynet = require "skynet"
local contriner_launcher = require "contriner_launcher"

skynet.start(function()
	skynet.error("start logserver>>>>>>>>>>>>>>>>>")

	contriner_launcher.run()
	--启动集群连接入口
	skynet.uniqueservice("cluster_server")

	skynet.exit()
end)