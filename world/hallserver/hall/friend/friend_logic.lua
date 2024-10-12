local log = require "skynet-fly.log"
local errorcode = require "common.enum.errorcode"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local state_data = require "skynet-fly.hotfix.state_data"
local tti = require "skynet-fly.cache.tti"
local friend_msg = require "msg.friend_msg"
local player_interface = require "hall.player.interface"
local player_rpc = require "common.rpc.hallserver.player"
local player_util = require "common.utils.player"
local env_util = require "skynet-fly.utils.env_util"
local friend_rpc = require "common.rpc.hallserver.friend"

local tinsert = table.insert
local pairs = pairs

local MAX_PAGE_COUNT = 20
local CACHE_TIME = 60 * 10

local g_svr_id = env_util.get_svr_id()
local g_get_field_map = {['nickname'] = true, ['last_logout_time'] = true}

local g_friend_cli = orm_table_client:instance("friend")                    --好友
local g_friend_req_cli = orm_table_client:instance("friend_req")            --添加好友请求

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
function M.do_friend_list_req(player_id, pack_body)
    local pageage_num = pack_body.pageage_num or 0
    local pageage_count = pack_body.pageage_count or 0
    if pageage_num <= 0 then
        return nil, errorcode.REQ_PARAM_ERR, "pageage_num err " .. pageage_num
    end

    if pageage_count <= 0 or pageage_count > MAX_PAGE_COUNT then
        return nil, errorcode.REQ_PARAM_ERR, "pageage_count err " .. pageage_count
    end

    local friend_list = g_local_info.friend_list_cache:get_cache(player_id)
    if not friend_list then
        friend_list = g_friend_cli:get_entry(player_id)
        g_local_info.friend_list_cache:set_cache(player_id, friend_list)
    end

    local start_index = (pageage_num - 1) * pageage_count + 1
    local end_index = start_index + pageage_count - 1

    local len = #friend_list

    local res_list = {
        pageage_num = pageage_num,
        pageage_count = pageage_count,
        total_count = len,
        friend_list = {},
    }

    local player_list = {}
    local friend_index_map = {}
    for i = start_index, end_index do
        if i > len then break end
        local info = friend_list[i]
        tinsert(player_list, info.friend_id)
        friend_index_map[info.friend_id] = i
    end

    local info_map = player_rpc.get_players_info(player_list, g_get_field_map)
    for pid, info in pairs(info_map) do
        local index = friend_index_map[pid]
        local friend_info = friend_list[index]
        for field in pairs(g_get_field_map) do
            friend_info[field] = info[field]
        end
    end

    for i = start_index, end_index do
        if i > len then break end
        local info = friend_list[i]
        tinsert(res_list.friend_list, {
            player_id = info.friend_id,
            nickname = info.nickname,
            last_logout_time = info.last_logout_time,
            is_online = info.is_online,
        })
    end

    g_local_info.friend_msg:friend_list_res(player_id, res_list)
    
    return true
end

--请求添加好友
function M.do_add_friend_req(player_id, pack_body)
    local add_player_id = pack_body.player_id or 0
    local add_svr_id = player_util.get_svr_id_by_player_id(add_player_id)
    if add_svr_id <= 0 then
        return nil, errorcode.REQ_PARAM_ERR, "invaild player_id:" .. add_player_id
    end

    if g_friend_cli:get_one_entry(player_id, add_player_id) then
        --已经是好友了
        return nil, errorcode.UNKOWN_ERR, "repeat add friend"
    end

    --本服
    if g_svr_id == add_svr_id then
        if g_friend_req_cli:get_one_entry(add_player_id, player_id) then
            --已经发起请求了
            return nil, errorcode.UNKOWN_ERR, "repeat add req"    
        end

        if not g_friend_req_cli:create_one_entry({req_player_id = player_id, player_id = add_player_id}) then
            return nil, errorcode.UNKOWN_ERR, "server err"
        end
    else
    --其他服
        local ret, errno, errmsg = friend_rpc.req_add_friend(player_id, add_player_id)
        if not ret then
            return ret, errno, errmsg
        end
    end

    g_local_info.friend_msg:add_friend_res(player_id, {
        player_id = add_player_id
    })
    
    return true
end

--同意添加好友
function M.do_agree_add_friend_req(player_id, pack_body)
    local add_player_id = pack_body.player_id or 0
    local add_svr_id = player_util.get_svr_id_by_player_id(add_player_id)
    if add_svr_id <= 0 then
        return nil, errorcode.REQ_PARAM_ERR, "invaild player_id:" .. add_player_id
    end

    if g_friend_req_cli:get_one_entry(player_id, add_player_id) then
        --没有发起过请求
        return nil, errorcode.UNKOWN_ERR, "not add req"
    end

    if not g_friend_req_cli:delete_one_entry(player_id, add_player_id) then
        return nil, errorcode.UNKOWN_ERR, "server err"
    end

    --添加为好友
    if not g_friend_cli:create_one_entry(player_id, add_player_id) then
        return nil, errorcode.UNKOWN_ERR, "server err"
    end

    --对方也把你加入好友列表
    if g_svr_id == add_svr_id then
        --同服
        if not g_friend_cli:get_one_entry(add_player_id, player_id) then
            if not g_friend_cli:create_one_entry(add_player_id, player_id) then
                g_friend_cli:delete_one_entry(player_id, add_player_id)
                return nil, errorcode.UNKOWN_ERR, "server err"
            end
        end
    else
        --不同服
        local ret, errno, errmsg = friend_rpc.req_agree_friend(player_id, add_player_id)
        if not ret then
            return ret,errno, errmsg
        end
    end

    g_local_info.friend_msg:agree_friend_res(player_id, {
        player_id = add_player_id
    })
    
    return true
end

--拒绝添加好友
function M.do_refuse_add_friend_req(player_id, pack_body)
    local add_player_id = pack_body.player_id or 0
    local add_svr_id = player_util.get_svr_id_by_player_id(add_player_id)
    if add_svr_id <= 0 then
        return nil, errorcode.REQ_PARAM_ERR, "invaild player_id:" .. add_player_id
    end

    if g_friend_req_cli:get_one_entry(player_id, add_player_id) then
        --没有发起过请求
        return nil, errorcode.UNKOWN_ERR, "not add req"
    end

    if not g_friend_req_cli:delete_one_entry(player_id, add_player_id) then
        return nil, errorcode.UNKOWN_ERR, "server err"
    end

    g_local_info.friend_msg:refuse_friend_res(player_id, {
        player_id = add_player_id
    })
    
    return true
end

--删除好友
function M.do_del_friend_req(player_id, pack_body)
    local del_player_id = pack_body.player_id or 0
    local del_svr_id = player_util.get_svr_id_by_player_id(del_player_id)
    if del_svr_id <= 0 then
        return nil, errorcode.REQ_PARAM_ERR, "invaild player_id:" .. del_player_id
    end

    if not g_friend_cli:get_one_entry(player_id, del_player_id) then
        return nil, errorcode.UNKOWN_ERR, "not friend"
    end

    if not g_friend_cli:delete_one_entry(player_id, del_player_id) then
        return nil, errorcode.UNKOWN_ERR, "server err"
    end

    --是同服的好友
    if g_svr_id == del_svr_id then
        if g_friend_cli:get_one_entry(del_player_id, player_id) then
            g_friend_cli:delete_one_entry(del_player_id, player_id)
        end
    else
        friend_rpc.req_del_friend(player_id, del_player_id)
    end

    g_local_info.friend_msg:del_friend_res(player_id, {
        player_id = del_player_id,
    })

    return true
end

--------------------------------------CMD-----------------------------------
function M.cmd_add_req(player_id, add_player_id)
    if g_friend_req_cli:get_one_entry(add_player_id, player_id) then
        --已经发起请求了
        return nil, errorcode.UNKOWN_ERR, "repeat add req"    
    end

    if not g_friend_req_cli:create_one_entry({req_player_id = player_id, player_id = add_player_id}) then
        return nil, errorcode.UNKOWN_ERR, "server err"
    end
    return true
end

function M.cmd_agree_req(player_id, add_player_id)
    if g_friend_cli:get_one_entry(add_player_id, player_id) then
        return true
    end

    if not g_friend_cli:create_one_entry(add_player_id, player_id) then
        return nil, errorcode.UNKOWN_ERR, "server err"
    end

    return true
end

function M.cmd_del_req(player_id, del_player_id)
    if g_friend_cli:get_one_entry(del_player_id, player_id) then
        g_friend_cli:delete_one_entry(del_player_id, player_id)
    end

    return true
end

return M