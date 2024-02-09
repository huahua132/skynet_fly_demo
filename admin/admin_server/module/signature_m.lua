local crypt = require "client.crypt"
local time_util = require "time_util"
local skynet_util = require "skynet_util"
local skynet = require "skynet"
local log = require "log"
local timer = require "timer"
local crypt = require "skynet.crypt"
local cache_help = require "cache_help"
local ENUM = require "ENUM"

local pairs = pairs
local next = next
local assert = assert

local g_cache = cache_help:new(ENUM.TOKEN_TIMEOUT * timer.second)

local CMD = {}

--重复登录就会顶掉之前的token秘钥，使之前的jwt token失效，从而实现单点登录
function CMD.create(username)
    local randomstr = crypt.randomkey()
    local signature = randomstr .. username .. time_util.time()
    if not g_cache:get_cache(username) then
        g_cache:set_cache(username, signature)
    else
        g_cache:update_cache(username, signature)
    end

    return signature
end

function CMD.get(username)
    local signature = g_cache:get_cache(username)
    return signature or ""
end

function CMD.start()
    skynet_util.lua_dispatch(CMD)
    return true
end

function CMD.exit()
    return true
end

return CMD