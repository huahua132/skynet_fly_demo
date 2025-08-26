local frpc_client = require "skynet-fly.client.frpc_client"
local log = require "skynet-fly.log"

local table = table
local sbyte = string.byte

local M = {}

--新增邮件
function M.add(title, content, item_list, vaild_time) 
    local cli = frpc_client:instance(frpc_client.FRPC_MODE.one, "centerserver", "global_email_m")
    local ret = cli:balance_call("add", title, content, item_list, vaild_time)
    if not ret then
        log.error("add email err ", title, content, item_list, vaild_time)
        return
    end

    return table.unpack(ret.result)
end

--删除邮件 
function M.del(guid)
    local cli = frpc_client:instance(frpc_client.FRPC_MODE.one, "centerserver", "global_email_m")
    local ret = cli:balance_call("del", guid)
    if not ret then 
        log.error("del email err ", guid)
        return
    end

    return table.unpack(ret.result)
end

--修改邮件
function M.change(guid, title, content, item_list, vaild_time)
    local cli = frpc_client:instance(frpc_client.FRPC_MODE.one, "centerserver", "global_email_m")
    local ret = cli:balance_call("change", guid, title, content, item_list, vaild_time)
    if not ret then
        log.error("change email err ", guid, title, content, item_list, vaild_time)
        return
    end

    return table.unpack(ret.result)
end

return M