local setmetatable = setmetatable

local PACK = require "common.pack_helper".PACK
local log = require "skynet-fly.log"

local M = {}
local meta = {__index = M}

function M:new(interface_mgr)
	local t = {
		interface_mgr = interface_mgr
	}
	setmetatable(t,meta)
	return t
end

--通知好友列表
function M:friend_list_notice(player_id, res)
	self.interface_mgr:rpc_push_msg(player_id, PACK.hallserver_friend.FriendListNotice, res)
end

--通知好友请求列表
function M:add_req_list_notice(player_id, res)
	self.interface_mgr:rpc_push_msg(player_id, PACK.hallserver_friend.AddReqListNotice, res)
end

--通知添加好友请求
function M:add_req_notice(player_id, res)
	if not self.interface_mgr:is_online(player_id) then return end
	self.interface_mgr:rpc_push_msg(player_id, PACK.hallserver_friend.AddReqNotice, res)
end

--通知添加好友
function M:add_friend_notice(player_id, res)
	self.interface_mgr:rpc_push_msg(player_id, PACK.hallserver_friend.AddFriendNotice, res)
end

--通知删除好友
function M:del_friend_notice(player_id, res)
	self.interface_mgr:rpc_push_msg(player_id, PACK.hallserver_friend.DelFriendNotice, res)
end

return M