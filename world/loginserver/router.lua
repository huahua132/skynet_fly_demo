local user_router = require "user_router"

return function(app)
    user_router(app:group("/user"))                    --用户模块
end