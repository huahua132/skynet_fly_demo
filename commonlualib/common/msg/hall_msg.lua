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

function M:join_res(player_id,join_res)
	self.interface_mgr:send_msg(player_id,'.game_hall.JoinRes',join_res)
end

return M