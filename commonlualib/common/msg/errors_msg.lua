local errorcode = require "common.enum.errorcode"
local PACK = require "common.pack_helper".PACK

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

function M:errors(player_id, code, msg, pack_id, rsp_session, fd)
	if not code then
		code = errorcode.UNKOWN_ERR
		msg = "unkown err"
	end
	local error = {
		code = code,
		msg = msg,
		pack_id = pack_id,
	}

	if rsp_session then
		if player_id then
			self.interface_mgr:rpc_error_msg(player_id, PACK.errors.Error, error, rsp_session)
		else
			self.interface_mgr:rpc_error_msg_byfd(fd, PACK.errors.Error, error, rsp_session)
		end
	else
		if player_id then
			self.interface_mgr:rpc_push_msg(player_id, PACK.errors.Error, error)
		else
			self.interface_mgr:rpc_push_msg_byfd(fd, PACK.errors.Error, error)
		end
	end
end

return M