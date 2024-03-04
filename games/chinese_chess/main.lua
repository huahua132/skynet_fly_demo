local skynet = require "skynet"
local contriner_launcher = require "skynet-fly.contriner.contriner_launcher"
local timer_point = require "skynet-fly.time_extend.timer_point"
local time_util = require "skynet-fly.utils.time_util"
local log = require "skynet-fly.log"

skynet.start(function()
	skynet.error("start chinese_chess>>>>>>>>>>>>>>>>>")
	contriner_launcher.run()
	--启动集群连接入口
	skynet.uniqueservice("cluster_server")
	--启动room_game_login 登录服务
	skynet.uniqueservice("room_game_login")

	skynet.call('.logger','lua','add_hook','common.log_hook')

	timer_point:new(timer_point.EVERY_MINUTE)
    :builder(function()
        log.info("每分钟:", os.date("[%Y%m%d %H:%M:%S",time_util.time()))
    end)
end)