local skynet = require "skynet"
local mod_config = require "mod_config"
local table_util = require "table_util"

skynet.start(function()
	--这是一个简单的石头剪刀布的游戏
	skynet.error("start chinese_chess>>>>>>>>>>>>>>>>>")

	--启动热更管理员服务
	local cmgr = skynet.uniqueservice('contriner_mgr')

	--启动skynet的debug_console
	skynet.newservice("debug_console", skynet.getenv('debug_port'))
	
	--启动依赖load_mods.lua配置生成的mod_config热更模块服务
	for mod_name,mod_cfg in table_util.sort_ipairs(mod_config,function(a,b)
		return a.launch_seq < b.launch_seq
	end) do
		skynet.call(cmgr,'lua','load_module',mod_name)
	end

	--启动room_game_login 登录服务
	skynet.uniqueservice("room_game_login")

	skynet.exit()
end)