local base = require "common.rpc.hallserver.base"
local cluster_client = require "skynet-fly.client.cluster_client"
local string_util = require "skynet-fly.utils.string_util"

local tonumber = tonumber
local table = table

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

-- 预告登录
function M.advance_login(player_id, rand_key)
    local cli = base.hallserver_player_m(player_id)
    local ret = cli:byid_mod_call("advance_login", player_id, rand_key)
    if not ret then
        return nil
    end

    return table.unpack(ret.result)
end

-- 获取自增ID所属的模块ID
function M.get_module_id()
    local cli = cluster_client:instance("hallserver", "player_m")
    local ret = cli:one_balance_call("get_module_id")
    if not ret then return end

    local cluster_name = ret.cluster_name
    local result = ret.result
    local module_id = result[1]
    local svr_id = tonumber(string_util.split(cluster_name, ':')[2])
    return module_id, svr_id
end

-- 注册
function M.register(player_id, account)
    local cli = base.hallserver_player_m(player_id)
    local ret = cli:byid_balance_call("register", player_id, account)
    if not ret then return end

    return table.unpack(ret.result)
end

return M