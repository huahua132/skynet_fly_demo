local player_util = require "common.utils.player"
local frpc_client = require "skynet-fly.client.frpc_client"

local M = {}

--大厅服的room_game_hall_m
function M.hallserver_room_game_hall_m(player_id)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    local cli = frpc_client:instance(frpc_client.FRPC_MODE.byid, "hallserver", "room_game_hall_m")
    cli:set_svr_id(svr_id)
    cli:set_mod_num(player_id)
    return cli
end

--大厅服的player_m
function M.hallserver_player_m(player_id)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    local cli = frpc_client:instance(frpc_client.FRPC_MODE.byid, "hallserver", "player_m")
    cli:set_svr_id(svr_id)
    cli:set_mod_num(player_id)
    return cli
end

--大厅服的token_m
function M.hallserver_token_m(player_id)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    local cli = frpc_client:instance(frpc_client.FRPC_MODE.byid, "hallserver", "token_m")
    cli:set_svr_id(svr_id)
    cli:set_mod_num(player_id)
    return cli
end

--大厅服的room_game_login
function M.hallserver_room_game_login(player_id)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    local cli = frpc_client:instance(frpc_client.FRPC_MODE.byid, "hallserver", ".room_game_login")
    cli:set_svr_id(svr_id)
    return cli
end

return M