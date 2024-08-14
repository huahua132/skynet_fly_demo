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

function M:errors(player_id,code,msg,pack_id)
	if not code then
		code = errorcode.UNKOWN_ERR
		msg = "unkown err"
	end
	local error = {
		code = code,
		msg = msg,
		pack_id = pack_id,
	}

	self.interface_mgr:send_msg(player_id,PACK.errors.Error,error)
end

return M