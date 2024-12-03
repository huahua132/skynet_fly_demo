local skynet = require "skynet"
local log = require "skynet-fly.log"
local time_util = require "skynet-fly.utils.time_util"
local watch_client = require "skynet-fly.rpc.watch_client"
local string_util = require "skynet-fly.utils.string_util"
local file_util = require "skynet-fly.utils.file_util"
local PUB_CHANNEL_NAME = require "common.enum.PUB_CHANNEL_NAME"
local logrotate = require "skynet-fly.logrotate"

local CMD = {}

local io = io
local os = os
local string = string
local pairs = pairs

local g_cfg = {
    filename = "warn.log",         --文件名
    file_path = './warnlog/',      --文件夹
    max_age = 7,                   --最大保留天数
}

local g_file_name = g_cfg.file_path .. g_cfg.filename

--记录
local function record(cluster_name,logstr)
    if not file_util.mkdir(g_cfg.file_path) then
        error("create g_monitor_log_dir err")
    end
   
    local str = string_util.split(cluster_name, ':')
    local svr_name, svr_id = str[1], str[2]
    local file = io.open(g_file_name,'a+')
    local log_str = '[' .. svr_name .. ']' .. '[' .. svr_id ..']' .. logstr
    file:write(log_str .. '\n')
    file:flush()
    file:close()
end

--获取日志
function CMD.read(pre_day)
    local filename = nil 
    if pre_day == 0 then --今天
        filename = g_file_name
    else
        local pre_time = time_util.day_time(-pre_day + 1,0,0,0)     --前几天
        local date = os.date("%Y%m%d",pre_time)
        filename = string.format('%s%s_%s',g_cfg.file_path,date,g_cfg.filename)
    end

    local file = io.open(filename, 'rb')
    if file then
        local content = file:read "a"
        file:close()
        return content
    end

    return nil
end

function CMD.start(config)
    skynet.fork(function()
        logrotate:new(g_cfg.filename):set_file_path(g_cfg.file_path):set_max_age(g_cfg.max_age):builder()
        for svr_name in pairs(config.node_map) do
            watch_client.watch(svr_name, PUB_CHANNEL_NAME.WANI_LOG, "record_handle", record)
        end
    end)
    return true
end

function CMD.exit()
    return true
end

return CMD