local model_role = require "model_role"
local rsp_body = require "rsp_body"
local CODE = require "CODE"
local log = require "log"
local assert = assert

return function(group)
    group:get('/roles',function(c)
        local roles = model_role.get_all_roles()
        if not roles then
            c.res:set_json_rsp(rsp_body.error_rsp(CODE.ERR_SERVER,""))
            return
        end

        c.res:set_json_rsp(rsp_body.ok_rsp(roles))
    end)

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
--   // mock get all roles form server
--   {
--     url: '/role/roles',
--     type: 'get',
--     response: _ => {
--       return {
--         code: 20000,
--         data: roles
--       }
--     }
--   },

--   // add role
--   {
--     url: '/role/role',
--     type: 'post',
--     response: {
--       code: 20000,
--       data: {
--         key: Mock.mock('@integer(300, 5000)')
--       }
--     }
--   },

--   // update role
--   {
--     url: '/role/role/[A-Za-z0-9]',
--     type: 'put',
--     response: {
--       code: 20000,
--       data: {
--         status: 'success'
--       }
--     }
--   },

--   // delete role
--   {
--     url: '/role/role/[A-Za-z0-9]',
--     type: 'delete',
--     response: {
--       code: 20000,
--       data: {
--         status: 'success'
--       }
--     }
--   }
-- ]