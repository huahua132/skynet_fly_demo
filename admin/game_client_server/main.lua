local skynet = require "skynet"
local container_launcher = require "skynet-fly.container.container_launcher"
local log = require "skynet-fly.log"

skynet.start(function()
	skynet.error("start game_client server >>>>>>>>>>>>>>>>>")

	container_launcher.run()
	skynet.exit()
end)