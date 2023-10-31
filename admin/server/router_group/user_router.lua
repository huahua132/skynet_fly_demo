local model_user = require "model_user"

return function(group)
    group:post('/login',function(c) 
        local token = model_user.login()
        local rsp = {
            code = 20000,
            msg = "登录成功",
            data = {
                token = token
            }
        }
        c.res:set_json_rsp(rsp)
    end)

    group:get('/info',function(c)
        local info = model_user.get_info()
        local rsp = {
            code = 20000,
            msg = "",
            data = info,
        }
        c.res:set_json_rsp(rsp)
    end)
end