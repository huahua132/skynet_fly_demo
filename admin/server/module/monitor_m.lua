-------------------------------------------------------
--对集群服务进行监控
-------------------------------------------------------
local skynet = require "skynet"
local cluster_client = require "cluster_client"
local timer_point = require "timer_point"
local string_util = require "string_util"
local time_util = require "time_util"
local contriner_client = require "contriner_client"
local json = require "cjson"
local log = require "log"
local os = os

local tonumber = tonumber
local ipairs = ipairs
local pairs = pairs
local io = io
local string = string
local error = error

contriner_client:register("logrotate_m")

local g_monitor_log_dir = "./monitor_log/"

local g_config = nil
local g_time_map = {}
local g_rigister_info = {}

local function rigister_rotate(cluster_name,file_name)
    if g_rigister_info[cluster_name] then
        return
    end

    local cfg = {
        filename = file_name,          --文件名
        file_path = g_monitor_log_dir, --文件夹
        max_age = 7,                   --最大保留天数
    }

    if contriner_client:instance("logrotate_m"):mod_call("add_rotate", cfg) then
        g_rigister_info[cluster_name] = file_name
    else
        log.error("rigister_rotate err ",cluster_name, file_name)
    end
end

local function monitor(svr_name)
    if not os.execute("mkdir -p " .. g_monitor_log_dir) then
        error("create g_monitor_log_dir err")
    end

    local cur_date = os.date("%H:%M:%S", time_util.time())
    local svr_debug_console = cluster_client:instance(svr_name,"debug_console_m")
    local svr_info_map = {[cur_date] = {}}
    local ret = svr_debug_console:all_mod_call('call','mem')
    local index = 0

    local server_name_map = {}

    for _,v in ipairs(ret) do
        svr_info_map[cur_date][v.cluster_name] = {}
        for server_id,server_info in pairs(v.result[1]) do
            local split = string_util.split(server_info,' ')
            local mem = tonumber(split[1])
            local name = split[4]:sub(1,#split[4] - 1)
            if name == "hot_containe" and split[5] then
                name = split[5]
            end

            index = index + 1
            local launch_date = ""
            if split[7] then
                launch_date = split[7]
            end
            local version = 0
            if split[8] then
                version = tonumber(split[8])
            end
            server_name_map[server_id] = name.. '_' .. server_id
            svr_info_map[cur_date][v.cluster_name][name .. '_' .. server_id] = {
                mem = mem,
            }
        end
    end

    local ret = svr_debug_console:all_mod_call('call','stat')

    for _,v in ipairs(ret) do
        for server_id,server_info in pairs(v.result[1]) do
            svr_info_map[cur_date][v.cluster_name][server_name_map[server_id]].task = server_info.task
            svr_info_map[cur_date][v.cluster_name][server_name_map[server_id]].mqlen = server_info.mqlen
            svr_info_map[cur_date][v.cluster_name][server_name_map[server_id]].cpu = server_info.cpu
            svr_info_map[cur_date][v.cluster_name][server_name_map[server_id]].message = server_info.message
        end
    end

    for _,info_map in pairs(svr_info_map) do
        for cluster_name,info in pairs(info_map) do
            local file_name = cluster_name .. '.log'
            rigister_rotate(cluster_name, file_name)
            local date_info = {[cur_date] = info}
            local json_str = json.encode(date_info)
            log.info("date_info:",date_info)
            local filepath = string.format("%s%s",g_monitor_log_dir, file_name)
            local file = io.open(filepath, 'a+')
            file:write(json_str .. '\n')
            file:flush()
            file:close()
        end
    end
end

local CMD = {}

function CMD.get_rigister_info()
    return g_rigister_info,g_monitor_log_dir
end

function CMD.start(config)
    g_config = config
    local node_list = config.node_list
    skynet.fork(function()
        for _,svr_name in ipairs(node_list) do
            g_time_map[svr_name] = timer_point:new(timer_point.EVERY_MINUTE):builder(monitor,svr_name)
        end
    end)
   
    return true
end

function CMD.exit()
    for _,time_obj in pairs(g_time_map) do
        --取消定时器
        time_obj:cancel()
    end
    return true
end

return CMD