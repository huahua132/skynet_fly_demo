local player_util = require "common.utils.player"
local cluster_client = require "skynet-fly.client.cluster_client"

local M = {}

function M.hallserver_hall(player_id)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    local cli = cluster_client:instance("hallserver", "room_game_hall_m")
    cli:set_svr_id(svr_id)
    cli:set_mod_num(player_id)
    return cli
end

return M