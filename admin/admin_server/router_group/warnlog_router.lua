local rsp_body = require "common.rsp_body"
local frpc_client = require "skynet-fly.client.frpc_client"
local log = require "skynet-fly.log"

local assert = assert
local tonumber = tonumber

return function(group)
    group:get('/info',function(c)
        local query = c.req.query
        local pre_day = assert(query.pre_day,"not pre_day")                 --前几天
        pre_day = tonumber(pre_day)
        local instance = frpc_client:instance("logserver","warn_m"):set_svr_id(1)
        local ret = instance:byid_mod_call('read', pre_day)
        local content = ret.result
        
        local result = nil
        if content then
            result = "OK"
            content = content[1]
        else
            content = "无"
        end
        rsp_body.set_rsp(c,{
            result = result,
            content = content
        })
    end)
end