local user_router = require "router_group.user_router"
local limit_mid = require "middleware.limit_mid"

return function(app)
    app:use(limit_mid)
    user_router(app:group("/user"))                    --用户模块
end