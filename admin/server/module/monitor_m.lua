-------------------------------------------------------
--对集群服务进行监控
-------------------------------------------------------
local cluster_client = require "cluster_client"
local timer_point = require "timer_point"
local string_util = require "string_util"
local time_util = require "time_util"
local json = require "cjson"
local log = require "log"
local os = os

local tonumber = tonumber
local ipairs = ipairs
local pairs = pairs
local io = io

local g_config = nil
local g_time_map = {}

local function monitor(svr_name)
    local svr_debug_console = cluster_client:instance(svr_name,"debug_console_m")

    local svr_info_map = {}
    local ret = svr_debug_console:all_mod_call('call','mem')
    for _,v in ipairs(ret) do
        svr_info_map[v.cluster_name] = {}
        for server_id,server_info in pairs(v.result[1]) do
            local split = string_util.split(server_info,' ')
            local mem = tonumber(split[1])
            local name = split[4]:sub(1,#split[4] - 1)
            if split[5] then
                name = split[5]
            end
            local index = 0
            if split[6] then
                index = tonumber(split[6])
            end
            local launch_date = ""
            if split[7] then
                launch_date = split[7]
            end
            local version = 0
            if split[8] then
                version = tonumber(split[8])
            end
            svr_info_map[v.cluster_name][server_id] = {
                mem = mem,
                name = name,
                index = index,
                launch_date = launch_date,
                version = version,
            }
        end
    end

    local ret = svr_debug_console:all_mod_call('call','stat')

    for _,v in ipairs(ret) do
        for server_id,server_info in pairs(v.result[1]) do
            svr_info_map[v.cluster_name][server_id].task = server_info.task
            svr_info_map[v.cluster_name][server_id].mqlen = server_info.mqlen
            svr_info_map[v.cluster_name][server_id].cpu = server_info.cpu
            svr_info_map[v.cluster_name][server_id].message = server_info.message
        end
    end

    local cur_date = os.date('%Y%m%d',time_util.time())
    for svr_name,info in pairs(svr_info_map) do
        local json_str = json.encode(info)
        
        local file = io.open('monitorlog-' .. svr_name .. '_' .. cur_date,'a+')
        file:write(json_str .. '\n')
        file:flush()
        file:close()
    end
end

local CMD = {}

function CMD.start(config)
    g_config = config
    local node_list = config.node_list
    for _,svr_name in ipairs(node_list) do
        g_time_map[svr_name] = timer_point:new(timer_point.EVERY_MINUTE):builder(monitor,svr_name)
    end
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