local user_router = require "user_router"
local role_router = require "role_router"
local monitor_router = require "monitor_router"
local realtimelist_router = require "realtimelist_router"

return function(app)
    user_router(app:group("/user"))
    role_router(app:group("/role"))
    monitor_router(app:group("/monitor"))
    realtimelist_router(app:group("/realtimelist"))
end