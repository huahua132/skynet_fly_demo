local log = require "log"
local skynet = require "skynet"
local cluster_client = require "cluster_client"

local svr_name,svr_id = skynet.getenv("svr_name"),skynet.getenv("svr_id")
return function(log_str)
    local log_info = log.parse(log_str)
    local log_type = log_info.log_type

    if log_type == log.FATAL or log_type == log.TRACEBACK then
        local warn = cluster_client:instance("logserver","warn_m")
        warn:one_mod_send("report",svr_name,svr_id,log_str)
    end
end