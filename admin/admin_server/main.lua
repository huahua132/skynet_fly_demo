local skynet = require "skynet"
local contriner_launcher = require "skynet-fly.contriner.contriner_launcher"
local timer_point = require "skynet-fly.time_extend.timer_point"
local time_util = require "skynet-fly.utils.time_util"
local log = require "skynet-fly.log"

skynet.start(function()
	skynet.error("start admin server !!!>>>>>>>>>>>>>>>>>")
	contriner_launcher.run()

	--启动集群连接入口
	skynet.uniqueservice("frpc_server")

	skynet.call('.logger','lua','add_hook','common.log_hook')

	timer_point:new(timer_point.EVERY_MINUTE)
    :builder(function()
        log.info("每分钟:", os.date("[%Y%m%d %H:%M:%S",time_util.time()))
    end)

	timer_point:new(timer_point.EVERY_MINUTE)
	:builder(function()
		log.fatal("测试错误日志上报:", os.date("[%Y%m%d %H:%M:%S",time_util.time()))
	end)
end)