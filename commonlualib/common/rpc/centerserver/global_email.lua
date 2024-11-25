local frpc_client = require "skynet-fly.client.frpc_client"
local log = require "skynet-fly.log"

local table = table
local sbyte = string.byte

local M = {}

--新增邮件
function M.add(title, context, item_list, vaild_time) 
    local cli = frpc_client:instance("centerserver", "global_email_m")
    local ret = cli:one_balance_call("add", title, context, item_list, vaild_time)
    if not ret then
        log.error("add email err ", title, context, item_list, vaild_time)
        return
    end

    return table.unpack(ret.result)
end

--删除邮件 
function M.del(guid)
    local cli = frpc_client:instance("centerserver", "global_email_m")
    local ret = cli:one_balance_call("del", guid)
    if not ret then 
        log.error("del email err ", guid)
        return
    end

    return table.unpack(ret.result)
end

--修改邮件
function M.change(guid, title, context, item_list, vaild_time)
    local cli = frpc_client:instance("centerserver", "global_email_m")
    local ret = cli:one_balance_call("change", guid, title, context, item_list, vaild_time)
    if not ret then
        log.error("change email err ", guid, title, context, item_list, vaild_time)
        return
    end

    return table.unpack(ret.result)
end

return M