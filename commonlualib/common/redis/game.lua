local redis = require "skynet-fly.db.redisc"
local log = require "skynet-fly.log"
local env_util = require "skynet-fly.utils.env_util"
local json = require "cjson"

local g_svr_id = env_util.get_svr_id()
local g_room_key = 'gameroom:' .. g_svr_id

local M = {}

--设置游戏房间信息
function M.set_game_room_info(player_id, game_room_info)
    local redis_cli = redis.instance("global")
    return redis_cli:hset(g_room_key, player_id, json.encode(game_room_info))
end

--获取游戏房间信息
function M.get_game_room_info(player_id)
    local redis_cli = redis.instance("global")
    local ret = redis_cli:hget(g_room_key, player_id)
    if not ret then
        return nil
    end
    return json.decode(ret)
end

--删除游戏房间信息
function M.del_game_room_info(player_id)
    local redis_cli = redis.instance("global")
    return redis_cli:hdel(g_room_key, player_id)
end

--删除本服务的房间信息
function M.del_all()
    local redis_cli = redis.instance("global")
    log.info("del_all>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", g_room_key)
    redis_cli:del(g_room_key)
end

return M