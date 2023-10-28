local setmetatable = setmetatable

local interface_mgr = nil

local M = {}
local meta = {__index = M}

function M:new(interface_mgr)
	local t = {
		interface_mgr = interface_mgr
	}
	setmetatable(t,meta)
	return t
end

function M:match_res(player_id,match_res)
	self.interface_mgr:send_msg(player_id,'.chinese_chess_hall.matchRes',match_res)
end

return M