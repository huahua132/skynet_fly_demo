local log = require "skynet-fly.log"
local errorcode = require "common.enum.errorcode"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local state_data = require "skynet-fly.hotfix.state_data"
local tti = require "skynet-fly.cache.tti"
local friend_msg = require "msg.friend_msg"
local player_util = require "common.utils.player"
local env_util = require "skynet-fly.utils.env_util"
local player_interface = require "hall.player.interface"

local tinsert = table.insert
local pairs = pairs

local MAX_PAGE_COUNT = 20
local CACHE_TIME = 60 * 10
local g_svr_id = env_util.get_svr_id()

local g_friend_cli = orm_table_client:instance("friend")

local g_local_info = state_data.alloc_table("g_local_info")

local M = {}

function M.init(interface_mgr)
    g_local_info.friend_list_cache = tti:new(CACHE_TIME)
    g_local_info.friend_msg = friend_msg:new(interface_mgr)
end

---------------------------客户端事件----------------------------------
--玩家登录
function M.on_login(player_id)
    
end

--玩家重连
function M.on_reconnect(player_id)
   
end

--玩家掉线
function M.on_disconnect(player_id)
    
end

--玩家登出
function M.on_loginout(player_id)
    
end

---------------------------客户端消息处理-------------------------------
function M.friend_list_req(player_id, pack_body)
    local pageage_num = pack_body.pageage_num or 0
    local pageage_count = pack_body.pageage_count or 0
    if pageage_num <= 0 then
        return nil, errorcode.REQ_PARAM_ERR, "pageage_num err " .. pageage_num
    end

    if pageage_count <= 0 or pageage_count > MAX_PAGE_COUNT then
        return nil, errorcode.REQ_PARAM_ERR, "pageage_count err " .. pageage_count
    end

    local firend_list = g_local_info.friend_list_cache:get_cache(player_id)
    if not firend_list then
        firend_list = g_friend_cli:get_entry(player_id)
        g_local_info.friend_list_cache:set_cache(player_id, firend_list)
    end

    local start_index = (pageage_num - 1) * pageage_count + 1
    local end_index = start_index + pageage_count - 1

    local len = #firend_list

    local res_list = {
        pageage_num = pageage_num,
        pageage_count = pageage_count,
        total_count = len,
        friend_list = {},
    }

    local need_get_info_map = {}
    local friend_index_map = {}
    for i = start_index, end_index do
        if i > len then break end
        local info = firend_list[i]
        local svr_id = player_util.get_svr_id_by_player_id(info.friend_id)
        if not need_get_info_map[svr_id] then
            need_get_info_map[svr_id] = {}
        end
        tinsert(need_get_info_map[svr_id], info.friend_id)
        friend_index_map[info.friend_id] = i
    end

    for svr_id, list in pairs(need_get_info_map) do
        if g_svr_id == svr_id then  --同服

        else

        end
    end

    for i = start_index, end_index do
        if i > len then break end
        local info = firend_list[i]
        tinsert(res_list.friend_list, {
            player_id = info.friend_id,
            nickname = info.nickname,
            last_logout_time = info.last_logout_time,
            is_online = info.is_online,
        })
    end

    g_local_info.friend_msg:friend_list_res(player_id, res_list)
end

return M