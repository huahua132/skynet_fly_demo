--正式环境启动配置
local server_cfg = loadfile("../../commonlualib/common/etc_prod/server_cfg.lua")()
local http_cfg = loadfile("../../commonlualib/common/etc_prod/http_cfg.lua")()
local cfg = loadfile('load_mods.lua')()

cfg.share_config_m.default_arg.server_cfg = server_cfg.admin.game_client_server

cfg.web_agent_m.default_arg = http_cfg.admin.game_client_server.agent
cfg.web_master_m.default_arg = http_cfg.admin.game_client_server.master

return cfg