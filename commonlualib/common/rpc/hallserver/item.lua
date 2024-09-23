local base = require "common.rpc.hallserver.base"
local log = require "skynet-fly.log"

local table = table

local M = {}

function M.get_item(player_id, id)
    local cli = base.hallserver_room_game_hall_m(player_id)
    local ret = cli:byid_mod_call("item_get_item", player_id, id)
    if not ret then
        log.error("get_item err ", player_id, id)
        return nil
    end
    return table.unpack(ret.result)
end

function M.add_item(player_id, id, count)
    local cli = base.hallserver_room_game_hall_m(player_id)
    local ret = cli:byid_mod_call("item_add_item", player_id, id, count)
    if not ret then
        log.error("add_item err ", player_id, id, count)
        return nil
    end
    return table.unpack(ret.result)
end

function M.reduce_item(player_id, id, count)
    local cli = base.hallserver_room_game_hall_m(player_id)
    local ret = cli:byid_mod_call("item_reduce_item", player_id, id, count)
    if not ret then
        log.error("reduce_item err ", player_id, id, count)
        return nil
    end
    return table.unpack(ret.result)
end

return M