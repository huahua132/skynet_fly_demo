local time_util = require "skynet-fly.utils.time_util"
local skynet_util = require "skynet-fly.utils.skynet_util"
local skynet = require "skynet"
local log = require "skynet-fly.log"
local timer = require "skynet-fly.timer"
local crypt = require "skynet.crypt"
local tti = require "skynet-fly.cache.tti"
local ENUM = require "enum.ENUM"

local pairs = pairs
local next = next
local assert = assert

local g_cache = tti:new(ENUM.TOKEN_TIMEOUT * timer.second)

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
    return true
end

function CMD.exit()
    return true
end

return CMD