local mult_queue = require "skynet-fly.mult_queue":new()
local timer = require "skynet-fly.timer"
local skynet = require "skynet"
local hotfix = require "skynet-fly.hotfix.hotfix"
local log = require "skynet-fly.log"

local M = {}

--并发玩家函数，player_id相同串行，不同可并发
function M.multi_player_func(player_id, func, ...)
    return mult_queue:multi(player_id, func, ...)
end

--调用单发执行，执行单发时，并发都暂时等待，此函数适用于操作所有玩家数据时
function M.unique(func, ...)
    return mult_queue:unique(func, ...)
end

--玩家定时器操作
function M.new_player_timer(player_id, expire, times, callback, ...)
    return timer:new(expire, times, M.multi_player_func, player_id, callback, ...)
end

--单发定时器 调用单发执行，执行单发时，并发都暂时等待，此函数适用于操作所有玩家数据时
function M.new_unique_timer(expire, times, callback, ...)
    return timer:new(expire, times, M.unique, callback, ...)
end

local function player_fork_func(player_id, func, ...)
    M.multi_player_func(player_id, func, ...)
end

--玩家fork操作
function M.player_fork(player_id, func, ...)
    skynet.fork(player_fork_func, player_id, func, ...)
end

local function fork(func, ...)
    M.unique(func, ...)
end

--单发fork操作
function M.fork(func, ...)
    skynet.fork(fork, func, ...)
end

--重写hotfix
local old_hotfix_func = hotfix.hotfix
function hotfix.hotfix(hotfixmods)
    return M.unique(old_hotfix_func, hotfixmods)
end

return M