local log = require "skynet-fly.log"
local errorcode = hotfix_require "common.enum.errorcode"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local state_data = require "skynet-fly.hotfix.state_data"
local friend_msg = hotfix_require "msg.friend_msg"
local player_interface = require "hall.player.interface"
local player_rpc = hotfix_require "common.rpc.hallserver.player"
local player_util = hotfix_require "common.utils.player"
local env_util = require "skynet-fly.utils.env_util"
local friend_rpc = hotfix_require "common.rpc.hallserver.friend"
local friend_sug_rpc = hotfix_require "common.rpc.matchserver.friend_sug"
local time_util = require "skynet-fly.utils.time_util"

local tinsert = table.insert
local pairs = pairs

local g_get_field_map = {['player_id'] = true, ['nickname'] = true, ['last_logout_time'] = true}

local g_friend_cli = orm_table_client:instance("friend")                    --好友
local g_friend_req_cli = orm_table_client:instance("friend_req")            --添加好友请求

local g_local_info = state_data.alloc_table("g_local_info")

local M = {}

function M.init(interface_mgr)
    g_local_info.friend_msg = friend_msg:new(interface_mgr)
    g_local_info.interface_mgr = interface_mgr
end

---------------------------客户端事件----------------------------------
--玩家登录
function M.on_login(player_id)
    local friend_list = g_friend_cli:get_entry(player_id)
    local player_list = {}
    local friend_index_map = {}
    for i = 1, #friend_list do
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

    local is_online_map = player_rpc.is_onlines(player_list)

    local msg_body = {friend_list = {}}
    for i = 1, #friend_list do
        local info = friend_list[i]
        tinsert(msg_body.friend_list, {
            player_id = info.friend_id,
            nickname = info.nickname,
            last_logout_time = info.last_logout_time,
            is_online = is_online_map[info.friend_id] and 1 or 0,
        })
    end

    --下发好友列表
    g_local_info.friend_msg:friend_list_notice(player_id, msg_body)
    --log.info("friend_list_notice", player_id, msg_body)
    local friend_req_list = g_friend_req_cli:get_entry(player_id)
    local req_player_list = {}
    for i = 1, #friend_req_list do
        local info = friend_req_list[i]
        tinsert(req_player_list, info.req_player_id)
    end
    
    local msg_body = {player_id_list = req_player_list, nickname_list = {}}
    local info_map = player_rpc.get_players_info(req_player_list, g_get_field_map)
    for i = 1, #friend_req_list do
        local info = friend_req_list[i]
        local player_info = info_map[info.req_player_id]
        if player_info then
            tinsert(msg_body.nickname_list, player_info.nickname)
        else
            tinsert(msg_body.nickname_list, "棋友_" .. info.req_player_id)
        end
    end
    --log.info(">>>>> ", friend_req_list, msg_body)
    --下发好友请求列表
    g_local_info.friend_msg:add_req_list_notice(player_id, msg_body)
end

--玩家重连
function M.on_reconnect(player_id)
    M.on_login(player_id)
end

--玩家掉线
function M.on_disconnect(player_id)
    
end

--玩家登出
function M.on_loginout(player_id)
    
end

---------------------------客户端消息处理-------------------------------
--请求添加好友
function M.do_add_friend_req(player_id, pack_body)
    local add_player_id = pack_body.player_id or 0
    if g_friend_cli:get_one_entry(player_id, add_player_id) then
        --已经是好友了
        return nil, errorcode.UNKOWN_ERR, "repeat add friend"
    end

    local ret, errno, errmsg = friend_rpc.req_add_friend(add_player_id, player_id)
    if not ret then
        return ret, errno, errmsg
    end

    return {
        player_id = add_player_id
    }
end

--同意添加好友
function M.do_agree_add_friend_req(player_id, pack_body)
    local add_player_id = pack_body.player_id or 0
    if not g_friend_req_cli:get_one_entry(player_id, add_player_id) then
        --没有发起过请求
        return nil, errorcode.UNKOWN_ERR, "not add req"
    end

    if not g_friend_req_cli:delete_entry(player_id, add_player_id) then
        return nil, errorcode.UNKOWN_ERR, "server err"
    end

    if g_friend_cli:get_one_entry(player_id, add_player_id) then
        return nil, errorcode.UNKOWN_ERR, "repeat add"
    end

    --添加为好友
    if not g_friend_cli:create_one_entry({player_id = player_id, friend_id = add_player_id, create_time = time_util.time()}) then
        return nil, errorcode.UNKOWN_ERR, "server err"
    end

    local friend_info = player_rpc.get_player_info(add_player_id, g_get_field_map)
    if friend_info then
        friend_info.is_online = player_rpc.is_online(add_player_id) and 1 or 0
        g_local_info.friend_msg:add_friend_notice(player_id, {friend_info = friend_info})
    else
        log.error("get_player_info err ", add_player_id)
    end

    --对方也把你加入好友列表
    local ret, errno, errmsg = friend_rpc.req_agree_friend(add_player_id, player_id)
    if not ret then
        return ret,errno, errmsg
    end
    return {
        player_id = add_player_id
    }
end

--拒绝添加好友
function M.do_refuse_add_friend_req(player_id, pack_body)
    local add_player_id = pack_body.player_id or 0
    if not g_friend_req_cli:get_one_entry(player_id, add_player_id) then
        --没有发起过请求
        return nil, errorcode.UNKOWN_ERR, "not add req"
    end

    if not g_friend_req_cli:delete_entry(player_id, add_player_id) then
        return nil, errorcode.UNKOWN_ERR, "server err"
    end

    return {
        player_id = add_player_id
    }
end

--删除好友
function M.do_del_friend_req(player_id, pack_body)
    local del_player_id = pack_body.player_id or 0
    if not g_friend_cli:get_one_entry(player_id, del_player_id) then
        return nil, errorcode.UNKOWN_ERR, "not friend"
    end

    if not g_friend_cli:delete_entry(player_id, del_player_id) then
        return nil, errorcode.UNKOWN_ERR, "server err"
    end

    --对方也删除你
    friend_rpc.req_del_friend(del_player_id, player_id)

    return {
        player_id = del_player_id,
    }
end

--请求好友推荐
function M.do_friend_sug_req(player_id, pack_body)
    local sug_list = friend_sug_rpc.sug_friend()
    if #sug_list <= 0 then return {} end
    local player_info_map = player_rpc.get_players_info(sug_list, {['nickname'] = true})
    local nickname_list = {}
    for i = 1, #sug_list do
        local player_info = player_info_map[sug_list[i]]
        if player_info then
            tinsert(nickname_list, player_info.nickname)
        else
            tinsert(nickname_list, "")
        end
    end
    local msg_body = {
        player_id_list = sug_list,
        nickname_list = nickname_list,
    }
    return msg_body
end

--------------------------------------CMD-----------------------------------
function M.cmd_add_req(player_id, do_player_id)
    if g_friend_req_cli:get_one_entry(player_id, do_player_id) then
        --已经发起请求了
        return nil, errorcode.UNKOWN_ERR, "repeat add req"    
    end

    if not g_friend_req_cli:create_one_entry({player_id = player_id, req_player_id = do_player_id, create_time = time_util.time()}) then
        return nil, errorcode.UNKOWN_ERR, "server err"
    end
    local friend_info = player_rpc.get_player_info(do_player_id, g_get_field_map)
    --推送玩家被加好友了
    g_local_info.friend_msg:add_req_notice(player_id, {player_id = do_player_id, nickname = friend_info.nickname})
    return true
end

function M.cmd_agree_req(player_id, do_player_id)
    if g_friend_cli:get_one_entry(player_id, do_player_id) then
        return true
    end

    if not g_friend_cli:create_one_entry({player_id = player_id, friend_id = do_player_id, create_time = time_util.time()}) then
        return nil, errorcode.UNKOWN_ERR, "server err"
    end

    --不在线就不用发了
    if not g_local_info.interface_mgr:is_online(player_id) then
        return
    end

    --通知添加好友
    local friend_info = player_rpc.get_player_info(do_player_id, g_get_field_map)
    if friend_info then
        friend_info.is_online = player_rpc.is_online(do_player_id) and 1 or 0
        g_local_info.friend_msg:add_friend_notice(player_id, {friend_info = friend_info})
    else
        log.error("get_player_info err ", do_player_id)
    end

    return true
end

function M.cmd_del_req(player_id, do_player_id)
    if g_friend_cli:get_one_entry(player_id, do_player_id) then
        g_friend_cli:delete_entry(player_id, do_player_id)
    end
    --不在线就不用发了
    if not g_local_info.interface_mgr:is_online(player_id) then
        return
    end
    --通知删除好友
    g_local_info.friend_msg:del_friend_notice(player_id, {player_id = do_player_id})
    return true
end

return M