
local friend_logic = hotfix_require "hall.friend.friend_logic"

--[[
    好友系统
    提供功能：
    好友推荐> 随机推荐在线列表非好友玩家
    好友基本功能> 添加，删除，好友聊天
    游戏邀请> 好友游戏邀请
]]

local M = {}

function M.init(interface_mgr)
   
end

function M.on_login(player_id)
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

}

local CMD = {}

M.register_cmd = CMD

return M