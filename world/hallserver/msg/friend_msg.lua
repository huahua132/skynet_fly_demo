local setmetatable = setmetatable

local M = {}
local meta = {__index = M}

function M:new(interface_mgr)
	local t = {
		interface_mgr = interface_mgr
	}
	setmetatable(t,meta)
	return t
end

function M:friend_list_res(player_id, res)
    self.interface_mgr:send_msg(player_id, '.hallserver_friend.FriendListRes', res)
end

return M