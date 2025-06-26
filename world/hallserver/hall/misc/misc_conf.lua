local skynet = require "skynet"
local sharedata = require "skynet-fly.sharedata"

local g_misc_param


local function init()
    g_misc_param = sharedata:new("../../commonlualib/data_tables/misc_param.lua", sharedata.enum.sharedata)
    :builder()
end

skynet.init(init)

local M = {}

--热更脚本触发
function M.hotfix()
    init()
end

--获取参数配置
function M.get_param()
    return g_misc_param:get_data_table()
end

return M