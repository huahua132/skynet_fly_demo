local player = require "common.rpc.hallserver.player"
local log = require "skynet-fly.log"

local table = table

local M = {}

function M.get_item(player_id, id)
    local ret = player.call_player_hall(player_id, "item_get_item", player_id, id)
    if not ret then
        log.error("get_item err ", player_id, id)
        return nil
    end
    return table.unpack(ret.result)
end

function M.add_item(player_id, id, count)
    local ret = player.call_player_hall(player_id, "item_add_item", player_id, id, count)
    if not ret then
        log.error("add_item err ", player_id, id, count)
        return nil
    end
    return table.unpack(ret.result)
end

function M.reduce_item(player_id, id, count)
    local ret = player.call_player_hall(player_id, "item_reduce_item", player_id, id, count)
    if not ret then
        log.error("reduce_item err ", player_id, id, count)
        return nil
    end
    return table.unpack(ret.result)
end

function M.add_item_map(player_id, item_map)
    local ret = player.call_player_hall(player_id, "item_add_item_map", player_id, item_map)
    if not ret then
        log.error("add_item_map err ", player_id, item_map)
        return nil
    end
    return table.unpack(ret.result)
end

return M