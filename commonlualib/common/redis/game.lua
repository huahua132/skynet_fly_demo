local redis = require "skynet-fly.db.redisc"
local log = require "skynet-fly.log"

local function room_key(player_id)
    return "gameroom:" .. player_id
end

local M = {}

--设置游戏房间信息
function M.set_game_room_info(player_id, game_room_info)
    local redis_cli = redis.instance("global")
    local key = room_key(player_id)
    local ret = redis_cli:hmset(key, game_room_info)
    return redis_cli:expire(key, 60 * 3600)                --一般局时不超过1个小时
end

--获取游戏房间信息
function M.get_game_room_info(player_id)
    local redis_cli = redis.instance("global")
    local key = room_key(player_id)
    return redis_cli:hgetall(key)
end

--删除游戏房间信息
function M.del_game_room_info(player_id)
    local redis_cli = redis.instance("global")
    local key = room_key(player_id)
    return redis_cli:del(key)
end

return M