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

function M:game_state_res(player_id,game_state_res)
    if player_id then
	    self.interface_mgr:send_msg(player_id,'.chinese_chess_game.gameStateRes',game_state_res)
    else
        self.interface_mgr:broad_cast_msg('.chinese_chess_game.gameStateRes',game_state_res)
    end
end

function M:next_doing(next_doing)
    self.interface_mgr:broad_cast_msg('.chinese_chess_game.nextDoing',next_doing)
end

function M:move_res(move_res)
    self.interface_mgr:broad_cast_msg('.chinese_chess_game.moveRes',move_res)
end

return M