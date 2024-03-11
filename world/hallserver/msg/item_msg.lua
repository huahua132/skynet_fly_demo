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

function M:item_list_notice(player_id, res)
    self.interface_mgr:send_msg(player_id, '.hallserver_item.ItemListNotice', res)
end

return M