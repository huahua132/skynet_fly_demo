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

function M:game_state_res(game_state_res)
    self.interface_mgr:rpc_push_broad_cast(PACK.chinese_chess_game.gameStateRes, game_state_res)
end

function M:next_doing(next_doing)
    self.interface_mgr:rpc_push_broad_cast(PACK.chinese_chess_game.nextDoing, next_doing)
end

function M:move_res(move_res)
    self.interface_mgr:rpc_push_broad_cast(PACK.chinese_chess_game.moveRes, move_res)
end

return M