local base = require "common.rpc.base"

local table = table

local M = {}

function M.get_item(player_id, id)
    local cli = base.hallserver_hall(player_id)
    local ret = cli:byid_mod_call("item_get_item", player_id, id)
    if not ret then
        return nil
    end
    return table.unpack(ret.result)
end

function M.add_item(player_id, id, count)
    local cli = base.hallserver_hall(player_id)
    local ret = cli:byid_mod_call("item_add_item", player_id, id, count)
    if not ret then
        return nil
    end
    return table.unpack(ret.result)
end

function M.reduce_item(player_id, id, count)
    local cli = base.hallserver_hall(player_id)
    local ret = cli:byid_mod_call("item_reduce_item", player_id, id, count)
    if not ret then
        return nil
    end
    return table.unpack(ret.result)
end

return M