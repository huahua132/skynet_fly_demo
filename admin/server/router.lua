local user_router = require "user_router"
local table_router = require "table_router"
local role_router = require "role_router"
local monitor_router = require "monitor_router"

return function(app)
    user_router(app:group("/user"))
    table_router(app:group("/table"))
    role_router(app:group("/role"))
    monitor_router(app:group("/monitor"))
end