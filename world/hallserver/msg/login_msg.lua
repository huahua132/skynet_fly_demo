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

function M:login_res(player_id,login_res)
	self.interface_mgr:send_msg(player_id,'.hallserver_login.LoginRes',login_res)
end

return M