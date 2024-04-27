local redis = require "skynet-fly.db.redisc"
local log = require "skynet-fly.log"
local env_util = require "skynet-fly.utils.env_util"
local player_util = require "common.utils.player"
local json = require "cjson"

local g_room_key = 'gameroom'

local function room_key(svr_id)
    return 'gameroom:' .. svr_id
end

local M = {}

--设置游戏房间信息
function M.set_game_room_info(player_id, game_room_info)
    local redis_cli = redis.instance("global")
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    local key = room_key(svr_id)
    return redis_cli:hset(key, player_id, json.encode(game_room_info))
end

--获取游戏房间信息
function M.get_game_room_info(player_id)
    local redis_cli = redis.instance("global")
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    local key = room_key(svr_id)
    local ret = redis_cli:hget(key, player_id)
    if not ret then
        return nil
    end
    return json.decode(ret)
end

--删除游戏房间信息
function M.del_game_room_info(player_id)
    local redis_cli = redis.instance("global")
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    local key = room_key(svr_id)
    return redis_cli:hdel(key, player_id)
end

return M