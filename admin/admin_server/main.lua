local skynet = require "skynet"
local contriner_launcher = require "skynet-fly.contriner.contriner_launcher"
local timer_point = require "skynet-fly.time_extend.timer_point"
local time_util = require "skynet-fly.utils.time_util"
local sharedata = require "skynet-fly.sharedata"
local log = require "skynet-fly.log"

skynet.start(function()
	skynet.call('.logger','lua','add_hook','common.log_hook')
	skynet.error("start admin server !!!>>>>>>>>>>>>>>>>>")

	sharedata.load({
        "../../commonlualib/common/data_tables",    --公共的
        "./data_tables"                             --本服独有的
    }, sharedata.enum.sharedata)

	contriner_launcher.run()

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