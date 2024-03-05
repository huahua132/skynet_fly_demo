local log = require "skynet-fly.log"
local time_util = require "skynet-fly.utils.time_util"
local hall_global = require "hall.hall_global"

local assert = assert
local pairs = pairs

local g_player_map = {}

local M = {}

--登录
function M.on_login(player_id)
    assert(not g_player_map[player_id], "is exists " .. player_id)
    g_player_map[player_id] = {}
end

--登出
function M.on_loginout(player_id)
    assert(g_player_map[player_id], "is not exists " .. player_id)
end

--接收到心跳
function M.on_heart(player_id)
    local player = g_player_map[player_id]
    if not player then
        return
    end

    player.heart_time = time_util.time()
end

--检测心跳
function M.check_heart()
    local cur_time = time_util.time()
    local hall_interface = hall_global.get_hall_interface()
    for player_id,player in pairs(g_player_map) do
        if cur_time - player.heart_time > 60 then  --心跳超时
            hall_interface.goout(player_id)        --踢出
        end
    end
end

return M