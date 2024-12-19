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

--回复消息  packid 规范好用 req_packid + 1
function M:rsp_msg(player_id, req_packid, rsp_body, rsp_session)
    if not rsp_session then
        return
    end
	self.interface_mgr:rpc_rsp_msg(player_id, req_packid + 1, rsp_body, rsp_session)
end

return M