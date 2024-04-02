local player_util = require "common.utils.player"
local cluster_client = require "skynet-fly.client.cluster_client"

local M = {}

--大厅服的room_game_hall_m
function M.hallserver_room_game_hall_m(player_id)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    local cli = cluster_client:instance("hallserver", "room_game_hall_m")
    cli:set_svr_id(svr_id)
    cli:set_mod_num(player_id)
    return cli
end

--大厅服的player_m
function M.hallserver_player_m(player_id)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    local cli = cluster_client:instance("hallserver", "player_m")
    cli:set_svr_id(svr_id)
    cli:set_mod_num(player_id)
    return cli
end

--大厅服的token_m
function M.hallserver_token_m(player_id)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    local cli = cluster_client:instance("hallserver", "token_m")
    cli:set_svr_id(svr_id)
    cli:set_mod_num(player_id)
    return cli
end

return M