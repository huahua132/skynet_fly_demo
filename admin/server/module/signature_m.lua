local crypt = require "client.crypt"
local time_util = require "time_util"
local skynet_util = require "skynet_util"
local skynet = require "skynet"
local log = require "log"
local timer = require "timer"

local pairs = pairs
local next = next

local NOT_RET = {}
local CMD = {}

local g_watch_map = {}

local g_signature = "dsfjisdhfiudgytuierh348dchug234879a" --私钥

local g_random_signature = nil

local function create_signature()
    local randomstr = crypt.randomkey()
    g_random_signature = g_signature .. randomstr .. time_util.time()

    for src,rsp in pairs(g_watch_map) do
        CMD.unwatch(src)
    end
end

function CMD.watch(source, oldsignature)
    log.info("watch ", skynet.self(), source, not oldsignature, oldsignature ~= g_random_signature)
    if not oldsignature or oldsignature ~= g_random_signature then
        return g_random_signature
    end

    g_watch_map[source] = skynet.response()

    return NOT_RET
end

function CMD.unwatch(source)
    local rsp = g_watch_map[source]
    if not rsp then
        return false
    end

    rsp(true, g_random_signature)
    g_watch_map[source] = nil
    return true
end

function CMD.refresh()
    create_signature()
end

function CMD.start()
    skynet_util.lua_dispatch(CMD,NOT_RET)
    create_signature()
    return true
end

function CMD.fix_exit()
    log.error("signature_m 确认要退出")
    timer:new(timer.second * 5,timer.loop,function()
        for src,rsp in pairs(g_watch_map) do
            log.error("确认要退出 signature src ",src)
            CMD.unwatch(src)
        end
    end)
end

function CMD.check_exit()
    log.error("signature_m 检测是否可以退出")
    if not next(g_watch_map) then
        log.error("signature_m 检测可以退出")
        return true
    else
        return false
    end
end

function CMD.exit()
    return true
end

return CMD