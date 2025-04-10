-- Desc: 好友推荐模块
local log = require "skynet-fly.log"
local timer = require "skynet-fly.timer"
local skynet = require "skynet"
local player_rpc = require "common.rpc.hallserver.player"

local ipairs = ipairs
local pairs = pairs
local tinsert = table.insert
local math = math

local g_time_obj = nil
local g_online_list = {}

local function sys_online_player()
    local ret, code, msgerr = player_rpc.get_all_online()
    if not ret then
        log.warn("sys_online_player get_all_online failed ", code, msgerr)
        return
    end

    g_online_list = {}
    for _,v in ipairs(ret) do
        local online_map = v.result[1]
        for player_id in pairs(online_map) do
            tinsert(g_online_list, player_id)
        end
    end
end

local CMD = {}

-- 获取推荐好友
function CMD.sug_friend()
    local sug_list = {}
    if #g_online_list <= 0 then return sug_list end
    for i = 1, 10 do
        local index = math.random(1, #g_online_list)
        tinsert(sug_list, g_online_list[index])
    end

    return sug_list
end

function CMD.start()
    skynet.fork(sys_online_player)
    g_time_obj = timer:new(timer.minute * 1, 0, sys_online_player)
    return true
end

function CMD.fix_exit()
    if g_time_obj then
        g_time_obj:cancel()
    end
end

function CMD.exit()
    return true
end

return CMD