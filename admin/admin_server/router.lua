local user_router = require "router_group.user_router"
local role_router = require "router_group.role_router"
local monitor_router = require "router_group.monitor_router"
local realtimelist_router = require "router_group.realtimelist_router"
local warnlog_router = require "router_group.warnlog_router"

return function(app)
    user_router(app:group("/user"))                     --用户模块
    role_router(app:group("/role"))                     --角色模块
    monitor_router(app:group("/monitor"))               --服务监控
    realtimelist_router(app:group("/realtimelist"))     --服务实时信息
    warnlog_router(app:group("/warnlog"))               --警告日志
end