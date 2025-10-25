local skynet = require "skynet"
local container_launcher = require "skynet-fly.container.container_launcher"

skynet.start(function()
	local svr_name = skynet.getenv('svr_name')
	local svr_id = skynet.getenv('svr_id')
	local c_name = svr_name .. '_' .. svr_id
	skynet.setenv('error_log_path', '../../error_logs/' .. c_name)
	skynet.setenv('error_log_name', 'error.log')
	skynet.setenv('user_log_path', '../../user_logs/' .. c_name)
	skynet.setenv('user_log_name', 'user.log')
	
	skynet.call('.logger','lua','add_hook','common.log_hook')
	skynet.error("start digitalbomb>>>>>>>>>>>>>>>>>")
	container_launcher.run()
	--启动集群连接入口
	skynet.uniqueservice("frpc_server")
	--启动room_game_login 登录服务
	skynet.uniqueservice("room_game_login")

	skynet.exit()
end)