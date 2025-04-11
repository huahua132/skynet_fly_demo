--服务开关
local watch_syn_client = require "skynet-fly.rpc.watch_syn_client"
local env_util = require "skynet-fly.utils.env_util"
local SYN_CHANNEL_NAME = require "common.enum.SYN_CHANNEL_NAME"
local SERVER_SWITCH_STATUS = require "common.enum.SERVER_SWITCH_STATUS"

local g_server_info = {}

do
    local svr_name = env_util.get_svr_name()
    local svr_id = env_util.get_svr_id()
    local cluster_name = svr_name .. '-' .. svr_id
    watch_syn_client.watch_byid(svr_name, svr_id, SYN_CHANNEL_NAME.server_info .. cluster_name, "switch_helper", function(_, _, server_info)
        g_server_info = server_info
    end)
end

local M = {}

--获取开关状态
function M.get_switch()
    return g_server_info.switch or SERVER_SWITCH_STATUS.CLOSE
end

return M