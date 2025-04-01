local player = require "common.rpc.hallserver.player"
local log = require "skynet-fly.log"

local table = table

local M = {}

function M.get_item(player_id, id)
    return player.call_player_hall(player_id, "item_get_item", player_id, id)
end

function M.add_item(player_id, id, count, source)
    return player.call_player_hall(player_id, "item_add_item", player_id, id, count, source)
end

function M.reduce_item(player_id, id, count, source)
    return player.call_player_hall(player_id, "item_reduce_item", player_id, id, count, source)
end

function M.add_item_map(player_id, item_map, source)
    return player.call_player_hall(player_id, "item_add_item_map", player_id, item_map, source)
end

return M