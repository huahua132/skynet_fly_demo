local rsp_body = require "common.rsp_body"
local frpc_client = require "skynet-fly.client.frpc_client"
local log = require "skynet-fly.log"

local assert = assert
local tonumber = tonumber

return function(group)
    group:get('/info',function(c)
        local content = "无"
        
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