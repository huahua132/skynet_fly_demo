local base = require "common.rpc.base"

local tonumber = tonumber
local table = table

local M = {}

--获取玩家信息
function M.get_player_info(player_id)
    local cli = base.hallserver_hall(player_id)
    local ret = cli:byid_mod_call("player_get_info", player_id)
    if not ret then
        return nil
    end

    return table.unpack(ret.result)
end

return M