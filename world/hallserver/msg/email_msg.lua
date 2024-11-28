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

--回复读取邮件
function M:read_email_res(player_id, res)
	self.interface_mgr:send_msg(player_id, PACK.hallserver_email.ReadEmailRes, res)
end

--回复领取道具列表
function M:item_list_email_res(player_id, res)
	self.interface_mgr:send_msg(player_id, PACK.hallserver_email.ItemListEmailRes, res)
end

--下发所有邮件
function M:all_email_notice(player_id, res)
    self.interface_mgr:send_msg(player_id, PACK.hallserver_email.AllEmailNotice, res)
end

--下发一条邮件
function M:one_email_notice(player_id, res)
	self.interface_mgr:send_msg(player_id, PACK.hallserver_email.OneEmailNotice, res)
end

--回复删除
function M:del_email_res(player_id, res)
	self.interface_mgr:send_msg(player_id, PACK.hallserver_email.DelEmailRes, res)
end

--通知删除邮件
function M:del_email_notice(player_id, res) 
	self.interface_mgr:send_msg(player_id, PACK.hallserver_email.DelEmailNotice, res)
end

return M