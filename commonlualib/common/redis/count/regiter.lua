local redis = require "skynet-fly.db.redisc"
local log = require "skynet-fly.log"
local env_util = require "skynet-fly.utils.env_util"
local time_util = require "skynet-fly.utils.time_util"
local player_util = require "common.utils.player"

local os = os

local function get_key(time)
    return "regiter:" .. os.date("%Y%m%d", time)
end

-- 每日注册统计
local M = {}

-- 注册成功
function M.add(player_id)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    local channel = player_util.get_channel_id_by_player_id(player_id)
    local key = get_key(time_util.time())
    local redis = redis.instance("global")
    local script_str = [[
        local key = KEYS[1]
        local svr_id = ARGV[1]
        local channel = ARGV[2]
        local is_exists = redis.call('exists', key)

        redis.call('hincrby', key, 'total', 1)            --总注册
        redis.call('hincrby', key, 'server-' .. svr_id, 1)   --指定服注册
        redis.call('hincrby', key, 'channel-' .. channel, 1) --指定渠道注册

        if is_exists == 0 then
            redis.call('expire', key, 86400 * 7)          --存7天
        end
    ]]
    redis:script_run(script_str, 1, key, svr_id, channel)
end

-- 获取前一天的信息
function M.get_predayinfo()
    local key = get_key(time_util.day_time(-1, 0, 0, 0))  --前一天 0点
    local redis = redis.instance("global")
    return redis:hgetall(key)
end

return M