--白名单
local watch_syn_client = require "skynet-fly.rpc.watch_syn_client"
local SYN_CHANNEL_NAME = require "common.enum.SYN_CHANNEL_NAME"
local log = require "skynet-fly.log"

local g_white_map = {}

do
    watch_syn_client.watch("centerserver", SYN_CHANNEL_NAME.white_info, "white_helper", function(_, white_map)
        g_white_map = white_map
    end)
end

local M = {}

--是否白名单
function M.is_white(player_id)
    return g_white_map[player_id]
end

--获取白名单map
function M.get_white_map()
    return g_white_map
end

return M