local frpc_client = require "skynet-fly.client.frpc_client"
local log = require "skynet-fly.log"

local table = table

local M = {}

--获取好友推荐
function M.sug_friend()
    local ret = frpc_client:instance(frpc_client.FRPC_MODE.one, "matchserver", "friend_sug_m"):balance_call("sug_friend")
    if not ret then
        log.error("sug_friend failed")    
        return {}
    end
    
    return table.unpack(ret.result)
end


return M