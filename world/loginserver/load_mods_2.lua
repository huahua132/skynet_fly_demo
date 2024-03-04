local server_cfg = loadfile("../../commonlualib/common/etc/server_cfg.lua")()
local http_cfg = loadfile("../../commonlualib/common/etc/http_cfg.lua")()
local cluster_server_cfg = loadfile("../../commonlualib/common/etc/cluster_server_cfg.lua")()
local cfg = loadfile('load_mods_1.lua')()

cfg.share_config_m.default_arg.cluster_server = cluster_server_cfg.world.loginserver_2
cfg.share_config_m.default_arg.server_cfg = server_cfg.world.loginserver_2

cfg.logrotate_m.default_arg.file_path = './logs_2/'
cfg.logrotate_m.default_arg.sys_cmd = [[
	/usr/bin/pkill -HUP -f skynet.loginserver_config.lua.load_mods_2.lua\n
]]

cfg.web_agent_m.default_arg = http_cfg.world.loginserver_2.agent
cfg.web_master_m.default_arg = http_cfg.world.loginserver_2.master

return cfg