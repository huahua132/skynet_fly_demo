local user_router = require "user_router"
local table_router = require "table_router"

return function(app)
    user_router(app:group("/user"))
    table_router(app:group("/table"))
end