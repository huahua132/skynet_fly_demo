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

function M:broad_enter_cast(enter_cast)
    self.interface_mgr:rpc_push_broad_cast(PACK.digitalbomb_game.EnterCast,enter_cast)
end

function M:broad_leave_cast(leave_cast)
    self.interface_mgr:rpc_push_broad_cast(PACK.digitalbomb_game.LeaveCast,leave_cast)
end

function M:broad_next_doing_cast(next_doing_cast)
    self.interface_mgr:rpc_push_broad_cast(PACK.digitalbomb_game.NextDoingCast,next_doing_cast)
end

function M:broad_game_start(game_start_cast)
    self.interface_mgr:rpc_push_broad_cast(PACK.digitalbomb_game.GameStartCast,game_start_cast)
end

function M:broad_game_over(game_over_cast)
    self.interface_mgr:rpc_push_broad_cast(PACK.digitalbomb_game.GameOverCast,game_over_cast)
end

function M:broad_doing_cast(doing_cast)
    self.interface_mgr:rpc_push_broad_cast(PACK.digitalbomb_game.DoingCast,doing_cast)
end

return M