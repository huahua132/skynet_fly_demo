local skynet = require "skynet"
local SEAT_STATE = require "SEAT_STATE"
local ws_pbnet_util = require "ws_pbnet_util"
local log = require "log"
local setmetatable = setmetatable
local assert = assert

local M = {}

local meta = {__index = M}

function M:new()
	local t = {
		player = nil,
		state = SEAT_STATE.empty,
		team_type = 0,
	}

	setmetatable(t,meta)
	return t
end

--坐下
function M:enter(player)
	assert(player)
	self.player = player
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

--发送消息给客户端
function M:send_msg(packname,pack)
	if not self.player then
		return nil
	end

	if self.player.fd > 0 then
		ws_pbnet_util.send(self.player.gate,self.player.fd,packname,pack)
	else
		log.info("send_msg not fd ",self.player_id)
	end
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

--设置队伍类型
function M:set_team_type(team_type)
	self.team_type = team_type
end

--返回队伍类型
function M:get_team_type()
	return self.team_type
end

return M