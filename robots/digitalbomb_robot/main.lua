local skynet = require "skynet"
local contriner_launcher = require "skynet-fly.contriner.contriner_launcher"

skynet.start(function()
	skynet.error("start digitalbomb_robot>>>>>>>>>>>>>>>>>")
	contriner_launcher.run()
	--启动集群连接入口
	skynet.uniqueservice("cluster_server")
	--调整日志服钩子函数处理
	skynet.call('.logger','lua','add_hook','common.log_hook')

	skynet.exit()
end)