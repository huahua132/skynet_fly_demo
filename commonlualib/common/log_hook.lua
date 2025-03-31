local log = require "skynet-fly.log"
local skynet = require "skynet"
local tti = require "skynet-fly.cache.tti"
local timer = require "skynet-fly.timer"
local log_helper = require "common.log_helper"

local warn_cache = tti:new(timer.hour)   --同一条错误，一个小时只报1次

return function(log_str,msg)
    local log_info = log.parse(log_str)
    local log_type = log_info.log_type
    if log_type == log.FATAL or log_type == log.TRACEBACK or log_type == log.ERROR then
        local sublen = 64
        local substr = nil
        if msg:len() < sublen then
            substr = msg
        else
            substr = msg:sub(1,sublen)
        end
        if not warn_cache:get_cache(substr) then
            warn_cache:set_cache(substr, true)
            log_helper.error_log(log_str)
        end
    end
end