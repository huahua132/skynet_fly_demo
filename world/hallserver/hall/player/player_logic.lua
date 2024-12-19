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
local mod_queue = require "skynet-fly.mod_queue"
local item_interface = require "hall.item.interface"
local schema = hotfix_require "common.enum.schema"
local player_conf = hotfix_require "hall.player.player_conf"
local chess_conf = hotfix_require "common.conf.chess_conf"
local table_util = require "skynet-fly.utils.table_util"

contriner_client:register("room_game_hall_m")

local assert = assert
local pairs = pairs
local tinsert = table.insert
local tremote = table.remove
local os = os

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
    g_local_info.mod_queue = mod_queue:new(1024)
    timer_point:new(timer_point.EVERY_DAY):builder(function()
        --跨天
        for i = 1, #g_player_list do
            event_mgr.publish(EVENT_ID.CROSS_DAY, g_player_list[i])        --跨天
        end
    end)
end

--检查升级
local function check_up_level(player_id, item_id, change_num, total_count)
    local player_info = interface.get_info(player_id)
    local level = player_info.level
    if level <= 0 then
        level = 1
    end
    --获取最新的经验值
    local total_count = item_interface.get_item(player_id, schema.enums.item_ID.PROP_EXP)
    local next_level, need_exp = player_conf.get_curexp_uplevel(level, total_count)        --升级所需经验
    if next_level == level then
        return
    end

    --尝试扣除经验值升级
    local ret = item_interface.reduce_item(player_id, item_id, need_exp)
    if not ret then --扣除失败，经验值不足
        return
    end

    if g_p_info_map[player_id] then
        player_info = g_p_info_map[player_id]
    end
    player_info.level = next_level
    log.info("check_up_level >>> ", player_id, item_id, change_num, total_count, level, next_level)
    --保存数据
    g_player_entity:change_save_one_entry({player_id = player_id, level = next_level})
    event_mgr.publish(EVENT_ID.PLAYER_UP_LEVEL, player_id, level, player_info.level)
end

--监听道具改变
event_mgr.monitor(EVENT_ID.ITEM_CHANGE, function(player_id, item_id, change_num, total_count)
    if change_num <= 0 then return end
    if item_id ~= schema.enums.item_ID.PROP_EXP then
        return
    end

    g_local_info.mod_queue:exec(player_id, check_up_level, player_id, item_id, change_num, total_count)
end)
---------------------------其他逻辑------------------------------------
--检测心跳
function M.check_heart()
    --log.info("check_heart >>>> ")
    local cur_time = os.time()      --心跳用系统时间，避免加速时间导致测试号被踢下线
    for player_id,heart_time in table_util.sort_ipairs_byk(g_p_heart_map) do
        if g_p_heart_map[player_id] and cur_time - heart_time > 60 then  --心跳超时
            g_local_info.hall_interface:goout(player_id, "heart time out")          --踢出
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
    g_p_heart_map[player_id] = os.time()
    g_p_info_map[player_id] = player_info

    tinsert(g_player_list, player_id)

    local change_info = {}
    if player_info.last_login_time == 0 then
        local param_cfg = chess_conf.get_params()
        player_info.rank_score = param_cfg.init_score
        change_info['rank_score'] = player_info.rank_score
        event_mgr.publish(EVENT_ID.FIRST_LOGIN, player_id)                                    --首次登录事件
    elseif time_util.is_cross_day(player_info.last_logout_time) then
        event_mgr.publish(EVENT_ID.CROSS_DAY, player_id)                                      --跨天事件
    end
    player_info.last_login_time = time_util.time()                                            --更新最后一次登录的时间
    change_info['player_id'] = player_id
    change_info['last_login_time'] = player_info.last_login_time
    player_info_notice(player_id)
    --保存数据
    g_player_entity:change_save_one_entry(change_info)
end

--登出
function M.on_loginout(player_id)
    --log.info("on_loginout start >>> ", player_id)
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

    local cur_time = time_util.time()
    g_p_heart_map[player_id] = cur_time

    return {
        time = cur_time
    }
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

function M.cmd_get_players_info(player_list, field_map)
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
    for server_id, list in table_util.sort_ipairs_byk(server_id_map) do
        if server_id ~= self_address then
            local ret_map = skynet.call(server_id, 'lua', 'player_get_players_info_by_local', list, field_map)
            table_util.merge(res_map, ret_map)
        else
            local ret_map = interface.get_players_info(list, field_map)
            table_util.merge(res_map, ret_map)
        end
    end
    return res_map
end

function M.cmd_get_players_info_by_local(player_list, field_map)
    return interface.get_players_info(player_list, field_map)
end

function M.cmd_change_rank_score(player_id, score)
    local now_score = g_player_entity:change_rank_score(player_id, score)
    local player_info = g_p_info_map[player_id]
    if player_info then
        player_info.rank_score = now_score

        g_local_info.player_msg:player_info_syn_notice(player_id, {
            synList = {{field_name = 'rank_score', is_str = 0, value = now_score}} 
        })
    end

    return now_score
end

-----------------------------interface------------------------------------
--获取所有在线玩家ID列表
function interface.get_online_list()
    return g_player_list
end

--获取玩家信息
function interface.get_info(player_id)
    return M.cmd_get_info(player_id)
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

--------------------------------------GM-----------------------------------
function M.gm_info(player_id)
    player_id = tonumber(player_id)
    if not player_id then
        return nil, "not player_id"
    end
    local player_info = M.cmd_get_info(player_id)
    if not player_info then
        return nil, "not player_info"
    end

    return player_info
end

return M