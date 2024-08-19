local base = require "common.rpc.hallserver.base"
local player_util = require "common.utils.player"

local table = table

local M = {}

--请求添加好友
function M.req_add_firend(player_id, add_player_id)
    local cli = base.hallserver_room_game_hall_m(add_player_id)
    local ret = cli:byid_mod_call("friend_add_req", player_id, add_player_id)
    if not ret then
        return nil
    end

    return table.unpack(ret.result)
end

return M