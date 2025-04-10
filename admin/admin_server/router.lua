local user_router = require "router_group.user_router"
local role_router = require "router_group.role_router"
local monitor_router = require "router_group.monitor_router"
local realtimelist_router = require "router_group.realtimelist_router"
local warnlog_router = require "router_group.warnlog_router"
local dashboard_router = require "router_group.dashboard_router"
local global_email_router = require "router_group.global_email_router"
local gm_router = require "router_group.gm_router"
local log_pannel_router = require "router_group.log_pannel_router"
local server_switch_router = require "router_group.server_switch_router"

return function(app)
    user_router(app:group("/user"))                     --用户模块
    role_router(app:group("/role"))                     --角色模块
    monitor_router(app:group("/monitor"))               --服务监控
    realtimelist_router(app:group("/realtimelist"))     --服务实时信息
    warnlog_router(app:group("/warnlog"))               --警告日志
    dashboard_router(app:group("/dashboard"))           --数据看板
    global_email_router(app:group("/global_email"))     --全服邮件
    gm_router(app:group("/gm"))                         --gm
    log_pannel_router(app:group("/log_pannel"))         --日志看板
    server_switch_router(app:group("/server_switch"))   --服务开关
end