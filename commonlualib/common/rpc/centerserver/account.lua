local cluster_client = require "skynet-fly.client.cluster_client"

local table = table
local sbyte = string.byte

local M = {}

--注册
function M.register(account_info, channel) 
    local cli = cluster_client:instance("centerserver", "account_m")
    cli:set_mod_num(sbyte(account_info.account, account_info.account:len()))
    local ret = cli:one_mod_call("register", account_info, channel)
    if not ret then return end

    return table.unpack(ret.result)
end

--认证登录 
function M.auth(account, password)
    local cli = cluster_client:instance("centerserver", "account_m")
    cli:set_mod_num(sbyte(account, account:len()))
    local ret = cli:one_mod_call("auth", account, password)
    if not ret then return end

    return table.unpack(ret.result)
end

return M