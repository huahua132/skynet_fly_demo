local skynet = require "skynet"
local contriner_launcher = require "contriner_launcher"
local timer_point = require "timer_point"
local time_util = require "time_util"
local log = require "log"

skynet.start(function()
	skynet.error("start stone_scissors_cloth!!!>>>>>>>>>>>>>>>>>")
	local delay_run = contriner_launcher.run()

	skynet.uniqueservice("room_game_login")

	delay_run()
	timer_point:new(timer_point.EVERY_MINUTE)
    :builder(function()
        log.info("每分钟:", os.date("[%Y%m%d %H:%M:%S",time_util.time()))
    end)
end)