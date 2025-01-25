local base = require "common.rpc.hallserver.base"
local player_util = require "common.utils.player"
local frpc_client = require "skynet-fly.client.frpc_client"
local contriner_client = require "skynet-fly.client.contriner_client"
local string_util = require "skynet-fly.utils.string_util"
local env_util = require "skynet-fly.utils.env_util"
local table_util = require "skynet-fly.utils.table_util"
local skynet = require "skynet"
local log = require "skynet-fly.log"

local tonumber = tonumber
local table = table
local pairs = pairs

local g_svr_id = env_util.get_svr_id()
local g_svr_name = env_util.get_svr_name()

local M = {}

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

--批量获取玩家信息
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

--获取单个玩家信息
function M.get_player_info(player_id, field_map)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    if g_svr_name == "hallserver" and svr_id == g_svr_id then
        return contriner_client:instance("room_game_hall_m"):mod_call("player_get_info", player_id, field_map)
    else
        local cli = base.hallserver_room_game_hall_m(player_id)
        local ret = cli:byid_mod_call("player_get_info", player_id)
        if not ret then
            log.error("get_player_info err ", player_id)
            return nil
        end
        return table.unpack(ret.result)
    end
end

--批量查询玩家是否在线
function M.is_onlines(player_list)
    local svr_map = player_util.get_svr_id_by_player_list(player_list)
    local res = {}
    for svr_id, list in pairs(svr_map) do
        --本服
        if g_svr_name == "hallserver" and svr_id == g_svr_id then
            local ret_map = skynet.call(".room_game_login", "lua", "is_onlines", list)
            table_util.merge(res, ret_map)
        else
            --其他服
            local ret_map = frpc_client:instance("hallserver", ".room_game_login"):set_svr_id(svr_id):byid_call_by_name("is_onlines", list)
            if not ret_map then
                log.error_fmt("is_onlines call err svr_id = %s", svr_id)
            else
                table_util.merge(res, ret_map)
            end
        end
    end

    return res
end

--查询单个玩家是否在线
function M.is_online(player_id)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    if g_svr_name == "hallserver" and svr_id == g_svr_id then
        return skynet.call(".room_game_login", "lua", "is_online", player_id)
    else
        return frpc_client:instance("hallserver", ".room_game_login"):set_svr_id(svr_id):byid_call_by_name("is_online", player_id)
    end
end

--发送到玩家所在room_game_hall(优先在线)
function M.send_player_hall(player_id, ...)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    if g_svr_name == "hallserver" and svr_id == g_svr_id then
        skynet.send(".room_game_login", "lua", "send_player_hall", player_id, ...)
    else
        local cli = base.hallserver_room_game_login(player_id)
        cli:byid_send_by_name("send_player_hall", player_id, ...)
    end
end

--发送到玩家所在room_game_hall(优先在线)
function M.call_player_hall(player_id, ...)
    local svr_id = player_util.get_svr_id_by_player_id(player_id)
    if g_svr_name == "hallserver" and svr_id == g_svr_id then
        return skynet.call(".room_game_login", "lua", "call_player_hall", player_id, ...)
    else
        local cli = base.hallserver_room_game_login(player_id)
        return cli:byid_call_by_name("call_player_hall", player_id, ...)
    end
end

--改变玩家段位积分
function M.change_rank_score(player_id, score)
    local ret = M.call_player_hall(player_id, "player_change_rank_score", player_id, score)
    if not ret then
        return nil
    end

    return table.unpack(ret.result)
end

--获取全部在线列表
function M.get_all_online()
    local cli = frpc_client:instance("hallserver", ".room_game_login")
    return cli:all_call_by_name("get_online_map")
end

return M