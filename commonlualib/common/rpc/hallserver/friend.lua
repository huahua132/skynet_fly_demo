local player = require "common.rpc.hallserver.player"
local player_util = require "common.utils.player"
local log = require "skynet-fly.log"

local table = table

local M = {}

--请求添加好友
function M.req_add_friend(player_id, do_player_id)
    return player.call_player_hall(player_id, "friend_add_req", player_id, do_player_id)
end

--同意加好友
function M.req_agree_friend(player_id, do_player_id)
   return player.call_player_hall(player_id, "friend_agree_req", player_id, do_player_id)
end

--删除好友
function M.req_del_friend(player_id, do_player_id)
    return player.call_player_hall(player_id, "friend_del_req", player_id, do_player_id)
end

return M