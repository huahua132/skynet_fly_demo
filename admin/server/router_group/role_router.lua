local model_role = require "model_role"
local rsp_body = require "rsp_body"
local CODE = require "CODE"

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