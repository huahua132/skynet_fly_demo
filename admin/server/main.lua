local skynet = require "skynet"
local contriner_launcher = require "contriner_launcher"

skynet.start(function()
	skynet.error("start admin server !!!>>>>>>>>>>>>>>>>>")
	contriner_launcher.run()
	skynet.exit()
end)