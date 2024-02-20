local server_cfg = loadfile("../../common/etc/server_cfg.lua")()
local http_cfg = loadfile("../../common/etc/http_cfg.lua")()
local cluster_server_cfg = loadfile("../../common/etc/cluster_server_cfg.lua")()
local gate_cfg = loadfile("../../common/etc/gate_cfg.lua")()
local mysql_cfg = loadfile("../../common/etc/mysql_cfg.lua")()
local cfg = loadfile('load_mods_1.lua')()

cfg.share_config_m.default_arg.cluster_server = cluster_server_cfg.world.hallserver_2
cfg.share_config_m.default_arg.server_cfg = server_cfg.world.hallserver_2
cfg.share_config_m.default_arg.room_game_login.gateconf = gate_cfg.world.hallserver_2

cfg.logrotate_m.default_arg.file_path = './logs_2/'
cfg.logrotate_m.default_arg.sys_cmd = [[
	/usr/bin/pkill -HUP -f skynet.hallserver_config.lua.load_mods_2.lua\n
]]

cfg.mysql_m.default_arg.db_conf = mysql_cfg.world.hallserver_2

return cfg