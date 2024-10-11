local base = require "common.rpc.hallserver.base"
local player_util = require "common.utils.player"
local log = require "skynet-fly.log"

local table = table

local M = {}

--请求添加好友
function M.req_add_firend(player_id, add_player_id)
    local cli = base.hallserver_room_game_hall_m(add_player_id)
    local ret = cli:byid_mod_call("friend_add_req", player_id, add_player_id)
    if not ret then
        log.error("req_add_firend err ", player_id, add_player_id)
        return nil
    end

    return table.unpack(ret.result)
end

--同意加好友
function M.req_agree_firend(player_id, add_player_id)
    local cli = base.hallserver_room_game_hall_m(add_player_id)
    local ret = cli:byid_mod_call("friend_agree_req", player_id, add_player_id)
    if not ret then
        log.error("req_agree_firend err ", player_id, add_player_id)
        return nil
    end

    return table.unpack(ret.result)
end

--删除好友
function M.req_del_firend(player_id, del_player_id)
    local cli = base.hallserver_room_game_hall_m(del_player_id)
    local ret = cli:byid_mod_call("friend_del_req", player_id, del_player_id)
    if not ret then
        log.error("req_del_firend err ", player_id, del_player_id)
        return nil
    end

    return table.unpack(ret.result)
end

return M