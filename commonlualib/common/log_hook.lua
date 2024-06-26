local log = require "skynet-fly.log"
local skynet = require "skynet"
local frpc_client = require "skynet-fly.client.frpc_client"
local tti = require "skynet-fly.cache.tti"
local timer = require "skynet-fly.timer"

local warn_cache = tti:new(timer.hour)   --同一条错误，一个小时只报1次

local svr_name,svr_id = skynet.getenv("svr_name"),skynet.getenv("svr_id")

return function(log_str,msg)
    local log_info = log.parse(log_str)
    local log_type = log_info.log_type

    if log_type == log.FATAL or log_type == log.TRACEBACK then
        local warn = frpc_client:instance("logserver","warn_m")
        local sublen = 64
        local substr = nil
        if msg:len() < sublen then
            substr = msg
        else
            substr = msg:sub(1,sublen)
        end

        if not warn_cache:get_cache(substr) then
            warn:one_mod_send("report",svr_name,svr_id,log_str)
            warn_cache:set_cache(substr, true)
        end
    end
end