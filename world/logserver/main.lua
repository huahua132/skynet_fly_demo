local skynet = require "skynet"
local container_launcher = require "skynet-fly.container.container_launcher"
local log = require "skynet-fly.log"

skynet.start(function()
	local svr_name = skynet.getenv('svr_name')
	local svr_id = skynet.getenv('svr_id')
	local c_name = svr_name .. '_' .. svr_id
	skynet.setenv('error_log_path', '../../error_logs/' .. c_name)
	skynet.setenv('error_log_name', 'error.log')
	skynet.setenv('user_log_path', '../../user_logs/' .. c_name)
	skynet.setenv('user_log_name', 'user.log')
	
	skynet.error("start logserver>>>>>>>>>>>>>>>>>")

	container_launcher.run()
	--启动集群连接入口
	skynet.uniqueservice("frpc_server")
	skynet.exit()
end)