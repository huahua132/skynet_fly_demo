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

--下发玩家信息
function M:player_info_notice(player_id, res)
    self.interface_mgr:rpc_push_msg(player_id, PACK.hallserver_player.PlayerInfoNotice, res)
end

--下发玩家同步信息
function M:player_info_syn_notice(player_id, syn_info)
	self.interface_mgr:rpc_push_msg(player_id, PACK.hallserver_player.PlayerInfoSynNotice, syn_info)
end

return M