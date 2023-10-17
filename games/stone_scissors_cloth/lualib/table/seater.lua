local skynet = require "skynet"
local SEAT_STATE = require "SEAT_STATE"
local log = require "log"
local setmetatable = setmetatable
local assert = assert

local M = {}

local meta = {__index = M}

function M:new()
	local t = {
		player = nil,
		state = SEAT_STATE.empty,
	}

	setmetatable(t,meta)
	return t
end

--坐下
function M:enter(player_id)
	self.player = {
		player_id = player_id
	}
	self.state = SEAT_STATE.waitting
end

--离开
function M:leave()
	self.player = nil
	self.state = SEAT_STATE.empty
end

--是否空座位
function M:is_empty()
	return self.state == SEAT_STATE.empty
end

--是否可以离开
function M:is_can_leave()
	return self.state ~= SEAT_STATE.playing
end

--获取玩家信息
function M:get_player()
	return self.player
end

--游戏开始
function M:game_start()
	self.state = SEAT_STATE.playing
end

--游戏结束
function M:game_over()
	self.state = SEAT_STATE.waitting
end

return M