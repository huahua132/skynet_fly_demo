local model_role = require "model_role"
local rsp_body = require "rsp_body"
local CODE = require "CODE"
local log = require "log"
local permission_mid = require "permission_mid"
local assert = assert

local client_path = '/permission'

return function(group)
    group:get('/roles',function(c)
        local roles = model_role.get_all_roles()
        if not roles then
            c.res:set_json_rsp(rsp_body.error_rsp(CODE.ERR_SERVER,""))
            return
        end

        c.res:set_json_rsp(rsp_body.ok_rsp(roles))
    end)

    permission_mid.set('post',group:calculate_absolute_path('/role'),client_path .. '/role')
    group:post('/role',function(c)
        local new_role = c.req.body

        local key,code,msg = model_role.add_role(new_role)
        if not key then
            c.res:set_json_rsp(rsp_body.error_rsp(code,msg))
        else
            c.res:set_json_rsp(rsp_body.ok_rsp{
                key = key
            })
        end
    end)

    permission_mid.set('put',group:calculate_absolute_path('/role/:key'),client_path .. '/role')
    group:put('/role/:key',function(c)
        local role = c.req.body
        local params = c.params
		local key = params.key
        assert(key, "not key")
        assert(role, "not role")
        local isok,code,msg = model_role.update_role(key, role)
        if not isok then
            c.res:set_json_rsp(rsp_body.error_rsp(code,msg))
        else
            c.res:set_json_rsp(rsp_body.ok_rsp('success'))
        end
    end)

    permission_mid.set('delete',group:calculate_absolute_path('/role/:key'),client_path .. '/role')
    group:delete('/role/:key',function(c)
        local params = c.params
		local key = params.key
        local isok,code,msg = model_role.del_role(key)
        if not isok then
            c.res:set_json_rsp(rsp_body.error_rsp(code,msg))
        else
            c.res:set_json_rsp(rsp_body.ok_rsp('success'))
        end
    end)
end