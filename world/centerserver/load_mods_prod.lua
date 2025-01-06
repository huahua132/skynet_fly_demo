local server_cfg = loadfile("../../commonlualib/common/etc_prod/server_cfg.lua")()
local redis_cfg = loadfile("../../commonlualib/common/etc_prod/redis_cfg.lua")()
local frpc_server_cfg = loadfile("../../commonlualib/common/etc_prod/frpc_server_cfg.lua")()
local mysql_cfg = loadfile("../../commonlualib/common/etc_prod/mysql_cfg.lua")()
local cfg = loadfile('load_mods.lua')()

cfg.share_config_m.default_arg.redis.rpc = redis_cfg.rpc
cfg.share_config_m.default_arg.redis.global = redis_cfg.global
cfg.share_config_m.default_arg.mysql.orm_db = mysql_cfg.world.centerserver

cfg.share_config_m.default_arg.frpc_server = frpc_server_cfg.world.centerserver
cfg.share_config_m.default_arg.server_cfg = server_cfg.world.centerserver

return cfg