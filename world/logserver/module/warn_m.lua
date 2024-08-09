local skynet = require "skynet"
local contriner_client = require "skynet-fly.client.contriner_client"
local log = require "skynet-fly.log"
local time_util = require "skynet-fly.utils.time_util"
local watch_client = require "skynet-fly.rpc.watch_client"
local string_util = require "skynet-fly.utils.string_util"
local PUB_CHANNEL_NAME = require "common.enum.PUB_CHANNEL_NAME"
contriner_client:register("logrotate_m")

local CMD = {}

local io = io
local os = os
local string = string
local pairs = pairs

local SELF_ADDRESS = skynet.self()

local g_cfg = {
    filename = "warn.log",         --文件名
    file_path = './warnlog/',      --文件夹
    max_age = 7,                   --最大保留天数
}

local g_file_name = g_cfg.file_path .. g_cfg.filename

--记录
local function record(cluster_name,logstr)
    if not os.execute("mkdir -p " .. g_cfg.file_path) then
        error("create g_monitor_log_dir err")
    end
    log.error("record1111 >>>> ", cluster_name, logstr)
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

    local file = io.open(filename, 'r')
    if file then
        local content = file:read "a"
        file:close()
        return content
    end

    return nil
end

function CMD.start(config)
    skynet.fork(function()
        if contriner_client:instance("logrotate_m"):mod_call("add_rotate", SELF_ADDRESS, g_cfg) then
            --logrotate的服务更新之后需要重新发送切割任务
            contriner_client:add_updated_cb("logrotate_m",function()
                contriner_client:instance("logrotate_m"):mod_call("add_rotate", SELF_ADDRESS, g_cfg)
            end)
        else
            log.error("rigister_rotate err ")
        end

        for svr_name in pairs(config.node_map) do
            watch_client.watch(svr_name, PUB_CHANNEL_NAME.WANI_LOG, "record_handle", record)
        end
    end)
    return true
end

function CMD.fix_exit()
    contriner_client:instance("logrotate_m"):mod_send("cancel", SELF_ADDRESS)
end

function CMD.exit()
    return true
end

return CMD