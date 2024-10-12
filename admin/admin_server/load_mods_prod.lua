--正式环境启动配置
local redis_cfg = loadfile("../../commonlualib/common/etc_prod/redis_cfg.lua")()
local mysql_cfg = loadfile("../../commonlualib/common/etc_prod/mysql_cfg.lua")()
local server_cfg = loadfile("../../commonlualib/common/etc_prod/server_cfg.lua")()
local frpc_server_cfg = loadfile("../../commonlualib/common/etc_prod/frpc_server_cfg.lua")()
local http_cfg = loadfile("../../commonlualib/common/etc_prod/http_cfg.lua")()
local cfg = loadfile('load_mods.lua')()

cfg.share_config_m.default_arg.redis.rpc = redis_cfg.rpc
cfg.share_config_m.default_arg.redis.global = redis_cfg.global
cfg.share_config_m.default_arg.mysql[mysql_cfg.admin.database] = mysql_cfg.admin

cfg.share_config_m.default_arg.frpc_server = frpc_server_cfg.admin.admin_server
cfg.share_config_m.default_arg.server_cfg = server_cfg.admin.admin_server

cfg.web_agent_m.default_arg = http_cfg.admin.admin_server.agent
cfg.web_master_m.default_arg = http_cfg.admin.admin_server.master

return cfg