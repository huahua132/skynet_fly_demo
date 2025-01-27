
local friend_logic = hotfix_require "hall.friend.friend_logic"

local PACK = require "common.pack_helper".PACK

--[[
    好友系统
    提供功能：
    好友推荐> 随机推荐在线列表非好友玩家
    好友基本功能> 添加，删除，好友聊天
    游戏邀请> 好友游戏邀请
]]

local M = {}

function M.init(interface_mgr)
    friend_logic.init(interface_mgr)
end

function M.on_login(player_id, is_jump_join)
    if is_jump_join then return end
    friend_logic.on_login(player_id)
end

function M.on_loginout(player_id)
    friend_logic.on_loginout(player_id)
end

function M.on_reconnect(player_id)
    friend_logic.on_reconnect(player_id)
end

function M.on_disconnect(player_id)
    friend_logic.on_disconnect(player_id)
end

M.handle = {
    --请求添加好友
    [PACK.hallserver_friend.AddFriendReq] = function(player_id, pack_id, pack_body)
        return friend_logic.do_add_friend_req(player_id, pack_body)
    end,
    --同意添加好友
    [PACK.hallserver_friend.AgreeAddFriendReq] = function(player_id, pack_id, pack_body)
        return friend_logic.do_agree_add_friend_req(player_id, pack_body)
    end,
    --拒绝添加好友
    [PACK.hallserver_friend.RefuseAddFriendReq] = function(player_id, pack_id, pack_body)
        return friend_logic.do_refuse_add_friend_req(player_id, pack_body)
    end,
    --删除好友
    [PACK.hallserver_friend.DelFriendReq] = function(player_id, pack_id, pack_body)
        return friend_logic.do_del_friend_req(player_id, pack_body)
    end,
    --好友推荐
    [PACK.hallserver_friend.FriendSugReq] = function(player_id, pack_id, pack_body)
        return friend_logic.do_friend_sug_req(player_id, pack_body)
    end
}

local CMD = {}

--请求加好友
function CMD.friend_add_req(player_id, add_player_id)
    return friend_logic.cmd_add_req(player_id, add_player_id)
end

--同意加好友
function CMD.friend_agree_req(player_id, add_player_id)
    return friend_logic.cmd_agree_req(player_id, add_player_id)
end

--删除好友
function CMD.friend_del_req(player_id, del_player_id)
    return friend_logic.cmd_del_req(player_id, del_player_id)
end

M.register_cmd = CMD

return M