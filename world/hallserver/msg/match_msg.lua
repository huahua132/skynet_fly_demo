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

function M:match_game_notice(player_id, res)
	self.interface_mgr:rpc_push_msg(player_id, PACK.hallserver_match.MatchGameNotice, res)
end

function M:join_game_notice(player_id, res)
    self.interface_mgr:rpc_push_msg(player_id, PACK.hallserver_match.JoinGameNotice, res)
end

return M