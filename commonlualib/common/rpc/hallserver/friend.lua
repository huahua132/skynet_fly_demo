local player = require "common.rpc.hallserver.player"
local player_util = require "common.utils.player"
local log = require "skynet-fly.log"

local table = table

local M = {}

--请求添加好友
function M.req_add_friend(player_id, add_player_id)
    local ret = player.call_player_hall(player_id, "friend_add_req", player_id, add_player_id)
    if not ret then
        log.error("req_add_friend err ", player_id, add_player_id)
        return nil
    end

    return table.unpack(ret.result)
end

--同意加好友
function M.req_agree_friend(player_id, add_player_id)
    local ret = player.call_player_hall(player_id, "friend_agree_req", player_id, add_player_id)
    if not ret then
        log.error("req_agree_friend err ", player_id, add_player_id)
        return nil
    end

    return table.unpack(ret.result)
end

--删除好友
function M.req_del_friend(player_id, del_player_id)
    local ret = player.call_player_hall(player_id, "friend_del_req", player_id, del_player_id)
    if not ret then
        log.error("req_del_friend err ", player_id, del_player_id)
        return nil
    end

    return table.unpack(ret.result)
end

return M