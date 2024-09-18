local server_cfg = loadfile("../../commonlualib/common/etc_prod/server_cfg.lua")()
local http_cfg = loadfile("../../commonlualib/common/etc_prod/http_cfg.lua")()
local frpc_server_cfg = loadfile("../../commonlualib/common/etc_prod/frpc_server_cfg.lua")()
local redis_cfg = loadfile("../../commonlualib/common/etc_prod/redis_cfg.lua")()
local cfg = loadfile('load_mods_1.lua')()

cfg.share_config_m.default_arg.redis.rpc = redis_cfg.rpc
cfg.share_config_m.default_arg.redis.global = redis_cfg.global

cfg.share_config_m.default_arg.frpc_server = frpc_server_cfg.world.loginserver_1
cfg.share_config_m.default_arg.server_cfg = server_cfg.world.loginserver_1

cfg.logrotate_m.default_arg.file_path = './logs_1/'
cfg.logrotate_m.default_arg.sys_cmd = [[
	/usr/bin/pkill -HUP -f skynet.make/loginserver_config.lua.load_mods_prod_1.lua\n
]]

cfg.web_agent_m.default_arg = http_cfg.world.loginserver_1.agent
cfg.web_master_m.default_arg = http_cfg.world.loginserver_1.master

return cfg