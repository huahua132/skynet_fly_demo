local model_user = require "model_user"
local rsp_body = require "rsp_body"
local log = require "log"

local assert = assert

return function(group)
    group:post('/login',function(c)
        local username = assert(c.req.body.username,"not username")
        local password = assert(c.req.body.password,"not password")
        local token, code, msg = model_user.login(username, password)

        if token then
            c.res:set_json_rsp(rsp_body.ok_rsp {token = token})
        else
            c.res:set_json_rsp(rsp_body.error_rsp(code, msg))
        end
    end)

    group:get('/info',function(c)
        local username = c.token_auth.username
        local info = model_user.get_info(username)
        c.res:set_json_rsp(rsp_body.ok_rsp(info))
    end)
end