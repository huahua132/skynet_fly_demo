local skynet = require "skynet"
local contriner_client = require "contriner_client"
local log = require "log"
local time_util = require "time_util"
contriner_client:register("logrotate_m")

local CMD = {}

local io = io
local os = os
local string = string
local SELF_ADDRESS = skynet.self()

local g_cfg = {
    filename = "warn.log",         --文件名
    file_path = './warnlog/',      --文件夹
    max_age = 7,                   --最大保留天数
}

local g_file_name = g_cfg.file_path .. g_cfg.filename

--上报
function CMD.report(svr_name,svr_id,log)
    if not os.execute("mkdir -p " .. g_cfg.file_path) then
        error("create g_monitor_log_dir err")
    end
    local file = io.open(g_file_name,'a+')
    local log_str = '[' .. svr_name .. ']' .. '[' .. svr_id ..']' .. log
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
        filename = string.format('%s%s_%s.log',g_cfg.file_path,date,g_cfg.filename)
    end

    local file = io.open(filename, 'r')
    log.info("read:", pre_day, filename)
    if file then
        local content = file:read "a"
        file:close()
        return content
    end

    return nil
end

function CMD.start()
    skynet.fork(function()
        if contriner_client:instance("logrotate_m"):mod_call("add_rotate", SELF_ADDRESS, g_cfg) then
            --logrotate的服务更新之后需要重新发送切割任务
            contriner_client:add_updated_cb("logrotate_m",function()
                contriner_client:instance("logrotate_m"):mod_call("add_rotate", SELF_ADDRESS, g_cfg)
            end)
        else
            log.error("rigister_rotate err ")
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