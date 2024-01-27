local crypt = require "client.crypt"
local time_util = require "time_util"
local skynet_util = require "skynet_util"
local skynet = require "skynet"
local log = require "log"
local timer = require "timer"
local watch_syn = require "watch_syn"

local pairs = pairs
local next = next
local assert = assert

local watch_server = nil

local CMD = {}

local g_watch_map = {}

local g_signature = "dsfjisdhfiudgytuierh348dchug234879a" --私钥

local g_random_signature = nil

local function create_signature()
    local randomstr = crypt.randomkey()
    g_random_signature = g_signature .. randomstr .. time_util.time()

    watch_server:publish("signature", g_random_signature)
end

function CMD.refresh()
    create_signature()
end

function CMD.start()
    watch_server:register("signature", g_signature)
    skynet_util.lua_dispatch(CMD)
    create_signature()
    return true
end

function CMD.exit()
    return true
end

watch_server = watch_syn.new_server(CMD)

return CMD