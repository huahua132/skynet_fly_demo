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
        rsp_body.set_rsp(c,roles,CODE.ERR_SERVER,"")
    end)

    permission_mid.set('post',group:calculate_absolute_path('/role'),client_path .. '/role')
    group:post('/role',function(c)
        local new_role = c.req.body

        local data,code,msg = model_role.add_role(new_role)
        rsp_body.set_rsp(c,data,code,msg)
    end)

    permission_mid.set('put',group:calculate_absolute_path('/role/:name'),client_path .. '/role')
    group:put('/role/:name',function(c)
        local role = c.req.body
        local params = c.params
		local name = params.name
        assert(name, "not name")
        assert(role, "not role")
        local data,code,msg = model_role.update_role(name, role)
        rsp_body.set_rsp(c,data,code,msg)
    end)

    permission_mid.set('delete',group:calculate_absolute_path('/role/:name'),client_path .. '/role')
    group:delete('/role/:name',function(c)
        local params = c.params
		local name = params.name
        local data,code,msg = model_role.del_role(name)
        rsp_body.set_rsp(c,data,code,msg)
    end)
end