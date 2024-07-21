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

function M:match_game_res(player_id, res)
	self.interface_mgr:send_msg(player_id, '.hallserver_match.MatchGameRes', res)
end

function M:cancel_match_game_res(player_id, res)
	self.interface_mgr:send_msg(player_id, '.hallserver_match.CancelMatchGameRes', res)
end

function M:match_game_notice(player_id, res)
	self.interface_mgr:send_msg(player_id, '.hallserver_match.MatchGameNotice', res)
end

function M:accept_match_res(player_id, res)
	self.interface_mgr:send_msg(player_id, '.hallserver_match.AcceptMatchRes', res)
end

function M:join_game_notice(player_id, res)
    self.interface_mgr:send_msg(player_id, '.hallserver_match.JoinGameNotice', res)
end

return M