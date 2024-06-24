local skynet = require "skynet"
local contriner_launcher = require "skynet-fly.contriner.contriner_launcher"
local log = require "skynet-fly.log"

skynet.start(function()
	skynet.error("start game_client server >>>>>>>>>>>>>>>>>")

	contriner_launcher.run()
	skynet.exit()
end)