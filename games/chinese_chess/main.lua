local skynet = require "skynet"
local contriner_launcher = require "contriner_launcher"

skynet.start(function()
	skynet.error("start chinese_chess>>>>>>>>>>>>>>>>>")
	contriner_launcher.run()
	--启动room_game_login 登录服务
	skynet.uniqueservice("room_game_login")

	skynet.exit()
end)