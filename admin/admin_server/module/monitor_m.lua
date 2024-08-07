-------------------------------------------------------
--对集群服务进行监控
-------------------------------------------------------
local skynet = require "skynet"
local frpc_client = require "skynet-fly.client.frpc_client"
local timer_point = require "skynet-fly.time_extend.timer_point"
local string_util = require "skynet-fly.utils.string_util"
local time_util = require "skynet-fly.utils.time_util"
local math_util = require "skynet-fly.utils.math_util"
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
    local svr_debug_console = frpc_client:instance(svr_name,"debug_console_m")
    local svr_info_map = {}
    local ret = svr_debug_console:all_mod_call('call','mem')
    if not ret then return end

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
           
            server_name_map[server_id] = name.. '_' .. server_id
            svr_info_map[v.cluster_name][name .. '_' .. server_id] = {
                mem = mem,
            }
            if not svr_info_map[v.cluster_name]['total'] then
                svr_info_map[v.cluster_name]['total'] = {
                    mem = 0,
                    task = 0,
                    mqlen = 0,
                    cpu = 0,
                    message = 0,
                    cmem = 0,
                }
            end

            local total_info = svr_info_map[v.cluster_name]['total']
            total_info.mem = total_info.mem + mem
        end
    end

    local ret = svr_debug_console:all_mod_call('call','stat')
    if ret then
        for _,v in ipairs(ret) do
            for server_id,server_info in pairs(v.result[1]) do
                local name_server = server_name_map[server_id]
                if name_server and svr_info_map[v.cluster_name] and svr_info_map[v.cluster_name][name_server] then
                    local svr_info = svr_info_map[v.cluster_name][name_server]
                    svr_info.task = server_info.task
                    svr_info.mqlen = server_info.mqlen
                    svr_info.cpu = server_info.cpu
                    svr_info.message = server_info.message

                    local total_info = svr_info_map[v.cluster_name]['total']
                    total_info.task = total_info.task + server_info.task
                    total_info.mqlen = total_info.mqlen + server_info.mqlen
                    total_info.cpu = total_info.cpu + server_info.cpu
                    total_info.message = total_info.message + server_info.message
                end
            end
        end
    end

    --c 内存信息
    local ret = svr_debug_console:all_mod_call('call','cmem')
    if ret then
        for _,v in ipairs(ret) do
            for server_id,cmem in pairs(v.result[1]) do
                local name_server = server_name_map[server_id]
                if name_server and svr_info_map[v.cluster_name] and svr_info_map[v.cluster_name][name_server] then
                    local svr_info = svr_info_map[v.cluster_name][name_server]
                    svr_info.cmem = math_util.number_div_str(cmem / 1024 * 100, 2)  --kb 保持2位小数

                    local total_info = svr_info_map[v.cluster_name]['total']
                    total_info.cmem = total_info.cmem + svr_info.cmem
                end
            end
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