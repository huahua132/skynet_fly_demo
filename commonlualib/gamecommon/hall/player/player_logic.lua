local log = require "skynet-fly.log"
local time_util = require "skynet-fly.utils.time_util"
local table_util = require "skynet-fly.utils.table_util"
local skynet = require "skynet"
local state_data = require "skynet-fly.hotfix.state_data"

local assert = assert
local tinsert = table.insert
local tremote = table.remove
local os = os

local g_logic_info = state_data.alloc_table("g_logic_info")
local g_player_map = state_data.alloc_table("g_player_map")
local g_player_list = state_data.alloc_table("g_player_list")

local M = {}
function M.init(interface_mgr)
    g_logic_info.hall_interface = interface_mgr
end
---------------------------其他逻辑------------------------------------
--检测心跳
function M.check_heart()
    local cur_time = os.time()                     --心跳用系统时间，避免加速时间导致测试号被踢下线
    for player_id,player in table_util.sort_ipairs_byk(g_player_map) do
        if g_player_map[player_id] and cur_time - player.heart_time > 60 then  --心跳超时
            g_logic_info.hall_interface:goout(player_id, "heart timeout") --踢出
        end
    end
end

---------------------------客户端事件----------------------------------
--登录
function M.on_login(player_id)
    --log.info("on_login >>> ", player_id)
    assert(not g_player_map[player_id], "is exists " .. player_id)
    g_player_map[player_id] = {
        heart_time = os.time()
    }
    tinsert(g_player_list, player_id)
end

--登出
function M.on_loginout(player_id)
    --log.info("on_loginout >>> ", player_id)
    assert(g_player_map[player_id], "is not exists " .. player_id)
    g_player_map[player_id] = nil
    for i = 1,#g_player_list do
        if g_player_list[i] == player_id then
            tremote(g_player_list, i)
            break
        end
    end
end

---------------------------客户端消息处理-------------------------------
--接收到心跳
function M.do_heart(player_id, pack_body)
    --log.info("do_heart >>> ", player_id)
    local player = g_player_map[player_id]
    if not player then
        return
    end

    local cur_time = time_util.time()
    player.heart_time = cur_time

    return {
        time = cur_time
    }
end

---------------------------CMD-------------------------------
--获取所有在线玩家ID
function M.cmd_get_all_online()
    return g_player_list
end

return M