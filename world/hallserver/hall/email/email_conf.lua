local skynet = require "skynet"
local sharedata = require "skynet-fly.sharedata"

local g_email_sys


local function init()
    g_email_sys = sharedata:new("../../commonlualib/data_tables/email_sys.lua", sharedata.enum.sharedata)
    :set_map("id_idx", "id")
    :builder()
end

skynet.init(init)

local M = {}

--热更脚本触发
function M.hotfix()
    init()
end

--获取邮件配置
function M.get_email_cfg(email_id)
    local id_idx = g_email_sys:get_map("id_idx")
    return id_idx[email_id]
end

return M