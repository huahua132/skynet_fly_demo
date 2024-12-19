local setmetatable = setmetatable

local PACK = require "common.pack_helper".PACK

local M = {}
local meta = {__index = M}

function M:new(interface_mgr)
	local t = {
		interface_mgr = interface_mgr
	}
	setmetatable(t,meta)
	return t
end

--下发所有邮件
function M:all_email_notice(player_id, res)
    self.interface_mgr:rpc_push_msg(player_id, PACK.hallserver_email.AllEmailNotice, res)
end

--下发一条邮件
function M:one_email_notice(player_id, res)
	self.interface_mgr:rpc_push_msg(player_id, PACK.hallserver_email.OneEmailNotice, res)
end

--通知删除邮件
function M:del_email_notice(player_id, res) 
	self.interface_mgr:rpc_push_msg(player_id, PACK.hallserver_email.DelEmailNotice, res)
end

return M