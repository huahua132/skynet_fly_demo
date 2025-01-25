local frpc_client = require "skynet-fly.client.frpc_client"
local log = require "skynet-fly.log"

local table = table

local M = {}

--获取好友推荐
function M.sug_friend()
    local ret = frpc_client:instance("matchserver", "firend_sug"):one_balance_call_by_name("sug_friend")
    if not ret then
        log.error("sug_friend failed")    
        return {}
    end
    
    return table.unpack(ret.result)
end


return M