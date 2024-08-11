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

function M:login_res(player_id,login_res)
	self.interface_mgr:send_msg(player_id,'.game_login.LoginRes',login_res)
end

M.login_req_pack_name = '.game_login.LoginReq'

return M