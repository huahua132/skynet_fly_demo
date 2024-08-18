local base = require "common.rpc.hallserver.base"
local player_util = require "common.utils.player"
local frpc_client = require "skynet-fly.client.frpc_client"
local contriner_client = require "skynet-fly.client.contriner_client"
local string_util = require "skynet-fly.utils.string_util"
local env_util = require "skynet-fly.utils.env_util"
local table_util = require "skynet-fly.utils.table_util"
local log = require "skynet-fly.log"

local tonumber = tonumber
local table = table
local pairs = pairs

local g_svr_id = env_util.get_svr_id()
local g_svr_name = env_util.get_svr_name()

local M = {}

--获取玩家信息
function M.get_player_info(player_id)
    local cli = base.hallserver_room_game_hall_m(player_id)
    local ret = cli:byid_mod_call("player_get_info", player_id)
    if not ret then
        return nil
    end

    return table.unpack(ret.result)
end

-- 获取自增ID所属的模块ID
function M.get_module_id()
    local cli = frpc_client:instance("hallserver", "player_m")
    local ret = cli:one_balance_call("get_module_id")
    if not ret then return end

    local cluster_name = ret.cluster_name
    local result = ret.result
    local module_id = result[1]
    local svr_id = tonumber(string_util.split(cluster_name, ':')[2])
    return module_id, svr_id
end

-- 获取host
function M.get_host(player_id)
    local cli = base.hallserver_player_m(player_id)
    local ret = cli:byid_mod_call("get_host")
    if not ret then return end

    return ret.result[1]
end

-- 注册
function M.register(player_id, account)
    local cli = base.hallserver_player_m(player_id)
    local ret = cli:byid_mod_call("register", player_id, account)
    if not ret then return end

    return table.unpack(ret.result)
end

-- 创建token
function M.create_token(player_id, timeout)
    local cli = base.hallserver_token_m(player_id)
    local ret = cli:byid_mod_call("create_token", {player_id}, timeout)
    if not ret then return end
    
    local token_list = ret.result[1]
    if not token_list then
        return
    end
    
    return token_list[1]
end

--新增游戏记录
function M.add_game_record(player_id, create_time, table_id, is_win, game_id, svr_id, score)
    local cli = base.hallserver_player_m(player_id)
    cli:byid_mod_send("add_game_record", player_id, create_time, table_id, is_win, game_id, svr_id, score)
end

--获取玩家信息
function M.get_players_info(player_list, field_map)
    local svr_map = player_util.get_svr_id_by_player_list(player_list)
    local res = {}
    for svr_id, list in pairs(svr_map) do
        --本服
        if g_svr_name == "hallserver" and svr_id == g_svr_id then
            local ret_map = contriner_client:instance("room_game_hall_m"):balance_call("player_get_players_info", list, field_map)
            table_util.merge(res, ret_map)
        else
        --其他服
            local ret_map = frpc_client:instance("hallserver", "room_game_hall_m"):set_svr_id(svr_id):byid_balance_call("player_get_players_info", list, field_map)
            if not ret_map then
                log.error_fmt("get_players_info call err svr_id = %s", svr_id)
            else
                table_util.merge(res, ret_map)
            end
        end
    end

    return res
end

return M