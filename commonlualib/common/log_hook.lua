local log = require "skynet-fly.log"
local skynet = require "skynet"
local tti = require "skynet-fly.cache.tti"
local timer = require "skynet-fly.timer"
local watch_server = require "skynet-fly.rpc.watch_server"
local PUB_CHANNEL_NAME = require "common.enum.PUB_CHANNEL_NAME"

local warn_cache = tti:new(timer.hour)   --同一条错误，一个小时只报1次

return function(log_str,msg)
    local log_info = log.parse(log_str)
    local log_type = log_info.log_type
    if log_type == log.FATAL or log_type == log.TRACEBACK then
        local sublen = 64
        local substr = nil
        if msg:len() < sublen then
            substr = msg
        else
            substr = msg:sub(1,sublen)
        end

        if not warn_cache:get_cache(substr) then
            watch_server.publish(PUB_CHANNEL_NAME.WANI_LOG, log_str)
            warn_cache:set_cache(substr, true)
        end
    end
end