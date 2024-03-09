local log = require "skynet-fly.log"
local time_util = require "skynet-fly.utils.time_util"
local player_msg = require "msg.player_msg"
local orm_table_client = require "skynet-fly.client.orm_table_client"

local assert = assert
local pairs = pairs

local g_hall_interface = nil
local g_player_entity = orm_table_client:instance("player")

local g_player_map = {}

local M = {}
function M.init(interface_mgr)
    g_hall_interface = interface_mgr
    player_msg = player_msg:new(interface_mgr)
end
---------------------------其他逻辑------------------------------------
--检测心跳
function M.check_heart()
    local cur_time = time_util.time()
    for player_id,player in pairs(g_player_map) do
        if cur_time - player.heart_time > 60 then  --心跳超时
            g_hall_interface.goout(player_id)        --踢出
        end
    end
end

--推送基础信息
local function player_info_notice(player_id)
    local player_info = g_player_entity:get_one_entry(player_id)
    if not player_info then
        log.error("player_entity not exists " .. player_id)
        return
    end

    log.info("player_info_notice ", player_info)
    player_msg:player_info_notice(player_id, {
        nickname = player_info.nickname
    })
end

---------------------------客户端事件----------------------------------
--登录
function M.on_login(player_id)
    log.info("on_login >>> ", player_id)
    assert(not g_player_map[player_id], "is exists " .. player_id)
    g_player_map[player_id] = {}
    player_info_notice(player_id)
end

--登出
function M.on_loginout(player_id)
    log.info("on_loginout >>> ", player_id)
    assert(g_player_map[player_id], "is not exists " .. player_id)
    g_player_map[player_id] = nil
end

--重连
function M.on_reconnect(player_id)
    log.info("on_reconnect >>> ", player_id)
    player_info_notice(player_id)
end

---------------------------客户端消息处理-------------------------------
--接收到心跳
function M.do_heart(player_id, pack_body)
    log.info("do_heart >>> ", player_id)
    local player = g_player_map[player_id]
    if not player then
        return
    end

    player.heart_time = time_util.time()

    return true
end

return M