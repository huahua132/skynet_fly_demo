local model_user = require "model_user"
local rsp_body = require "rsp_body"
local log = require "log"

local assert = assert

return function(group)
    group:post('/login',function(c)
        local username = assert(c.req.body.username,"not username")
        local password = assert(c.req.body.password,"not password")
        local data, code, msg = model_user.login(username, password)
        rsp_body.set_rsp(c,data,code,msg)
    end)

    group:get('/info',function(c)
        local username = c.token_auth.username
        local data,code,msg = model_user.get_info(username)
        rsp_body.set_rsp(c,data,code,msg)
    end)

    group:post('/logout',function(c)
        rsp_body.set_rsp(c,'success')
    end)
end