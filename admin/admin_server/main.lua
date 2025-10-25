local skynet = require "skynet"
local container_launcher = require "skynet-fly.container.container_launcher"
local timer_point = require "skynet-fly.time_extend.timer_point"
local time_util = require "skynet-fly.utils.time_util"
local sharedata = require "skynet-fly.sharedata"
local log = require "skynet-fly.log"

skynet.start(function()
	local svr_name = skynet.getenv('svr_name')
	local svr_id = skynet.getenv('svr_id')
	local c_name = svr_name .. '_' .. svr_id
	skynet.setenv('error_log_path', '../../error_logs/' .. c_name)
	skynet.setenv('error_log_name', 'error.log')
	skynet.setenv('user_log_path', '../../user_logs/' .. c_name)
	skynet.setenv('user_log_name', 'user.log')
	
	skynet.call('.logger','lua','add_hook','common.log_hook')
	skynet.error("start admin server !!!>>>>>>>>>>>>>>>>>")
	container_launcher.run()

	--启动集群连接入口
	skynet.uniqueservice("frpc_server")

	timer_point:new(timer_point.EVERY_MINUTE)
    :builder(function()
        log.info("每分钟:", os.date("[%Y%m%d %H:%M:%S",time_util.time()))
    end)

	timer_point:new(timer_point.EVERY_MINUTE)
	:builder(function()
		log.fatal("测试错误日志上报:", os.date("[%Y%m%d %H:%M:%S",time_util.time()))
	end)
end)