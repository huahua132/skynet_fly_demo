-------------------------------------------------------
--对集群服务进行监控
-------------------------------------------------------
local skynet = require "skynet"
local cluster_client = require "skynet-fly.client.cluster_client"
local timer_point = require "skynet-fly.time_extend.timer_point"
local string_util = require "skynet-fly.utils.string_util"
local time_util = require "skynet-fly.utils.time_util"
local contriner_client = require "skynet-fly.client.contriner_client"
local json = require "cjson"
local log = require "skynet-fly.log"
local os = os

local tonumber = tonumber
local ipairs = ipairs
local pairs = pairs
local io = io
local string = string
local error = error

contriner_client:register("logrotate_m")

local g_monitor_log_dir = "./monitor_log/"

local SELF_ADDRESS
local g_config = nil
local g_time_map = {}
local g_rigister_info = {}

local function rigister_rotate(cluster_name,server_name,file_path,file_name)
    if g_rigister_info[cluster_name] and g_rigister_info[cluster_name][server_name] then
        return
    end

    if not g_rigister_info[cluster_name] then
        g_rigister_info[cluster_name] = {}
    end

    local cfg = {
        filename = file_name,          --文件名
        file_path = file_path, --文件夹
        max_age = 7,                   --最大保留天数
    }

    if contriner_client:instance("logrotate_m"):mod_call("add_rotate", SELF_ADDRESS, cfg) then
        g_rigister_info[cluster_name][server_name] = file_name

        --logrotate的服务更新之后需要重新发送切割任务
        contriner_client:add_updated_cb("logrotate_m",function()
            contriner_client:instance("logrotate_m"):mod_call("add_rotate", SELF_ADDRESS, cfg)
        end)
    else
        log.error("rigister_rotate err ",cluster_name,server_name,file_path,file_name)
    end
end

local function monitor(svr_name)
    if not os.execute("mkdir -p " .. g_monitor_log_dir) then
        error("create g_monitor_log_dir err")
    end

    local cur_date = os.date("%H:%M:%S", time_util.time())
    local svr_debug_console = cluster_client:instance(svr_name,"debug_console_m")
    local svr_info_map = {}
    local ret = svr_debug_console:all_mod_call('call','mem')

    local server_name_map = {}

    for _,v in ipairs(ret) do
        svr_info_map[v.cluster_name] = {}
        for server_id,server_info in pairs(v.result[1]) do
            local split = string_util.split(server_info,' ')
            local mem = tonumber(split[1])
            local name = split[4]:sub(1,#split[4] - 1)
            if name == "hot_containe" and split[5] then
                name = split[5]
            end
            local launch_date = ""
            if split[7] then
                launch_date = split[7]
            end
            local version = 0
            if split[8] then
                version = tonumber(split[8])
            end
            server_name_map[server_id] = name.. '_' .. server_id
            svr_info_map[v.cluster_name][name .. '_' .. server_id] = {
                mem = mem,
            }
        end
    end

    local ret = svr_debug_console:all_mod_call('call','stat')

    for _,v in ipairs(ret) do
        for server_id,server_info in pairs(v.result[1]) do
            svr_info_map[v.cluster_name][server_name_map[server_id]].task = server_info.task
            svr_info_map[v.cluster_name][server_name_map[server_id]].mqlen = server_info.mqlen
            svr_info_map[v.cluster_name][server_name_map[server_id]].cpu = server_info.cpu
            svr_info_map[v.cluster_name][server_name_map[server_id]].message = server_info.message
        end
    end

    for cluster_name,server_info in pairs(svr_info_map) do
        for server_name,info in pairs(server_info) do
            local file_path = g_monitor_log_dir .. cluster_name .. '/'
            local file_name = server_name .. '.log'
            rigister_rotate(cluster_name,server_name,file_path,file_name)
            local fname = string.format("%s%s",file_path,file_name)
            if not os.execute("mkdir -p " .. file_path) then
                error("create g_monitor_log_dir err")
            end        
            local file = io.open(fname,'a+')
            if file then
                local info_json = json.encode({[cur_date] = info})
                file:write(info_json .. '\n')
                file:flush()
                file:close()
            else
                log.error("open file err ",fname)
            end
        end
    end
end

local CMD = {}

function CMD.get_rigister_info()
    return g_rigister_info,g_monitor_log_dir
end

function CMD.start(config)
    SELF_ADDRESS = skynet.self()
    g_config = config
    local node_list = config.node_list
    skynet.fork(function()
        for _,svr_name in ipairs(node_list) do
            g_time_map[svr_name] = timer_point:new(timer_point.EVERY_MINUTE):builder(monitor,svr_name)
        end
    end)

    return true
end

--确定会退出
function CMD.fix_exit()
    contriner_client:instance("logrotate_m"):mod_send("cancel", SELF_ADDRESS)
    for _,time_obj in pairs(g_time_map) do
        --取消定时器
        time_obj:cancel()
    end
end

--退出
function CMD.exit()
    return true
end

return CMD