local log = require "skynet-fly.log"
local time_util = require "skynet-fly.utils.time_util"
local player_msg = require "msg.player_msg"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local skynet = require "skynet"
local interface = require "hall.player.interface"
local event_mgr = require "common.event_mgr"
local timer_point = require "skynet-fly.time_extend.timer_point"
local EVENT_ID = require "enum.EVENT_ID"
local state_data = require "skynet-fly.hotfix.state_data"
local contriner_client = require "skynet-fly.client.contriner_client"
local table_util = require "skynet-fly.utils.table_util"

contriner_client:register("room_game_hall_m")

local assert = assert
local pairs = pairs
local tinsert = table.insert
local tremote = table.remove

local g_player_entity = orm_table_client:instance("player")

local g_local_info = state_data.alloc_table("g_local_info")
local g_p_info_map = state_data.alloc_table("g_p_info_map")                 --在线玩家信息表
local g_p_heart_map = state_data.alloc_table("g_p_heart_map")               --在线玩家心跳
local g_player_list = state_data.alloc_table("g_player_list")               --在线玩家列表

local function get_field_value(tab, field_map)
    local new = {}

    for field_name in pairs(field_map) do
        assert(tab[field_name], "get_field_value not exists fieldname : " .. field_name)
        new[field_name] = tab[field_name]
    end

    return new
end

local M = {}
function M.init(interface_mgr)
    g_local_info.hall_interface = interface_mgr
    g_local_info.player_msg = player_msg:new(interface_mgr)
    timer_point:new(timer_point.EVERY_DAY):builder(function()
        --跨天
        for i = 1, #g_player_list do
            skynet.fork(event_mgr.publish, EVENT_ID.CROSS_DAY, g_player_list[i])        --跨天
        end
    end)
end
---------------------------其他逻辑------------------------------------
--检测心跳
function M.check_heart()
    --log.info("check_heart >>>> ")
    local cur_time = time_util.time()
    for player_id,heart_time in pairs(g_p_heart_map) do
        if cur_time - heart_time > 60 then  --心跳超时
            skynet.fork(g_local_info.hall_interface.goout, g_local_info.hall_interface, player_id) --踢出
        end
    end
end

--推送基础信息
local function player_info_notice(player_id)
    local player_info = g_p_info_map[player_id]
    if not player_info then return end
    --log.info("player_info_notice ", player_info)
    g_local_info.player_msg:player_info_notice(player_id, player_info)
end

---------------------------客户端事件----------------------------------
--登录
function M.on_login(player_id)
    local player_info = g_player_entity:get_one_entry(player_id)
    if not player_info then
        log.error("player_entity not exists " .. player_id)
        return
    end
    --log.info("on_login >>> ", player_id)
    assert(not g_p_heart_map[player_id], "is exists " .. player_id)
    g_p_heart_map[player_id] = time_util.time()
    g_p_info_map[player_id] = player_info

    tinsert(g_player_list, player_id)
    player_info_notice(player_id)

    if player_info.last_login_time == 0 then
        skynet.fork(event_mgr.publish, EVENT_ID.FIRST_LOGIN, player_id)                       --首次登录事件
    elseif time_util.is_cross_day(player_info.last_logout_time) then
        skynet.fork(event_mgr.publish, EVENT_ID.CROSS_DAY, player_id)                         --跨天事件
    end
    player_info.last_login_time = time_util.time()                                            --更新最后一次登录的时间

    --保存数据
    g_player_entity:change_save_one_entry({player_id = player_id, last_login_time = player_info.last_login_time})
end

--登出
function M.on_loginout(player_id)
    --log.info("on_loginout >>> ", player_id)
    assert(g_p_heart_map[player_id], "is not exists " .. player_id)
    local player_info =  g_p_info_map[player_id]
    assert(player_info, "not exists player_info " .. player_id)
    g_p_heart_map[player_id] = nil
    g_p_info_map[player_id] = nil
   
    player_info.last_logout_time = time_util.time()
    for i = 1,#g_player_list do
        if g_player_list[i] == player_id then
            tremote(g_player_list, i)
            break
        end
    end

    g_player_entity:change_save_one_entry({player_id = player_id, last_logout_time = player_info.last_logout_time})
end

--重连
function M.on_reconnect(player_id)
    --log.info("on_reconnect >>> ", player_id)
    player_info_notice(player_id)
end

---------------------------客户端消息处理-------------------------------
--接收到心跳
function M.do_heart(player_id, pack_body)
    --log.info("do_heart >>> ", player_id)
    if not g_p_heart_map[player_id] then
        return
    end

    g_p_heart_map[player_id] = time_util.time()

    return true
end

---------------------------CMD--------------------------------------------
--获取玩家信息
function M.cmd_get_info(player_id)
    if g_p_info_map[player_id] then
        return g_p_info_map[player_id]
    end
    return g_player_entity:get_one_entry(player_id)
end

--获取所有在线玩家ID
function M.cmd_get_all_online()
    return g_player_list
end

function M.cmd_get_players_info(player_list, field_list)
    local cli = contriner_client:instance("room_game_hall_m")
    local self_address = skynet.self()
    local server_id_map = {}
    for i = 1, #player_list do
        local player_id = player_list[i]
        cli:set_mod_num(player_id)
        local server_id = cli:get_mod_server_id()
        if not server_id_map[server_id] then
            server_id_map[server_id] = {}
        end
        tinsert(server_id_map[server_id], player_id)
    end

    local res_map = {}
    for server_id, list in pairs(server_id_map) do
        if server_id ~= self_address then
            local ret_map = skynet.call(server_id, 'lua', 'player_get_players_info_by_local', list, get_field_value)
            table_util.merge(res_map, ret_map)
        else
            local ret_map = interface.get_players_info(list, get_field_value)
            table_util.merge(res_map, ret_map)
        end
    end
    return res_map
end

function M.cmd_get_players_info_by_local(player_list, field_list)
    return interface.get_players_info(player_list, field_list)
end

-----------------------------interface------------------------------------
--获取所有在线玩家ID列表
function interface.get_online_list()
    return g_player_list
end

--获取玩家信息
function interface.get_info(player_id)
    return M.cmd_get_info
end

--批量获取玩家信息
function interface.get_players_info(player_list, field_map)
    local ret_map = {}
    local not_online_list = {}
    for i = 1, #player_list do
        local player_id = player_list[i]
        if g_p_info_map[player_id] then
            ret_map[player_id] = get_field_value(g_p_info_map[player_id], field_map)
        else
            tinsert(not_online_list, player_id)
        end
    end

    if #not_online_list > 0 then
        local map = g_player_entity:get_players_info(not_online_list, field_map)
        table_util.merge(ret_map, map)
    end

    return ret_map
end

return M