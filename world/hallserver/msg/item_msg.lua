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

function M:item_list_notice(player_id, res)
	if self.interface_mgr:is_online(player_id) then
    	self.interface_mgr:send_msg(player_id, PACK.hallserver_item.ItemListNotice, res)
	end
end

return M