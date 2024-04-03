-------------------------------------------------------
--监控在线
-------------------------------------------------------
local skynet = require "skynet"
local cluster_client = require "skynet-fly.client.cluster_client"
local timer_point = require "skynet-fly.time_extend.timer_point"
local string_util = require "skynet-fly.utils.string_util"
local time_util = require "skynet-fly.utils.time_util"
local math_util = require "skynet-fly.utils.math_util"
local contriner_client = require "skynet-fly.client.contriner_client"
local player_util = require "common.utils.player"
local json = require "cjson"
local log = require "skynet-fly.log"
local os = os

local tonumber = tonumber
local ipairs = ipairs
local pairs = pairs
local io = io
local string = string
local error = error

local SELF_ADDRESS
local g_config = nil
local g_time_map = {}
local g_rigister_info = {}

contriner_client:register("logrotate_m")

local g_monitor_log_dir = "./monitor_online_log/"

local function rigister_rotate(svr_name,file_path,file_name)
    if g_rigister_info[svr_name] then
        return
    end

    local cfg = {
        filename = file_name,          --文件名
        file_path = file_path,         --文件夹
        max_age = 7,                   --最大保留天数
    }

    if contriner_client:instance("logrotate_m"):mod_call("add_rotate", SELF_ADDRESS, cfg) then
        g_rigister_info[svr_name] = file_name

        --logrotate的服务更新之后需要重新发送切割任务
        contriner_client:add_updated_cb("logrotate_m",function()
            contriner_client:instance("logrotate_m"):mod_call("add_rotate", SELF_ADDRESS, cfg)
        end)
    else
        log.error("rigister_rotate err ",svr_name,file_path,file_name)
    end
end

local function monitor(svr_name)
    if not os.execute("mkdir -p " .. g_monitor_log_dir) then
        error("create g_monitor_log_dir err")
    end

    local cur_date = os.date("%H:%M:%S", time_util.time())
    local player_cli = cluster_client:instance(svr_name, "room_game_hall_m")
    local ret = player_cli:all_broadcast_call("get_all_online")
    if not ret then return end
    
    local info = {
        total = 0,   --总在线
    }

    for _,v in ipairs(ret) do
        local cluster_name = v.cluster_name
        local svr_id = string_util.split(cluster_name, ':')[2]
        local result = v.result
        local player_map_list = result[1]
        for server_id, retlist in pairs(player_map_list) do
            local player_list = retlist[1]
            info.total = info.total + #player_list

            if not info['server-' .. svr_id] then
                info['server-' .. svr_id] = 0
            end
            info['server-' .. svr_id] = info['server-' .. svr_id] + #player_list

            for _, player_id in ipairs(player_list) do
                local channel = player_util.get_channel_id_by_player_id(player_id)

                if not info['channel-' .. channel] then
                    info['channel-' .. channel] = 0
                end
                info['channel-' .. channel] = info['channel-' .. channel] + 1
            end
        end
    end

    --log.info("monitor:", info)

    local file_path = g_monitor_log_dir
    local file_name = svr_name .. '.log'
    local fname = string.format("%s%s",file_path,file_name)
    if not os.execute("mkdir -p " .. file_path) then
        error("create g_monitor_log_dir err")
    end
    rigister_rotate(svr_name,file_path,file_name)
    local file = io.open(fname, 'a+')
    if file then
        local info_json = json.encode({[cur_date] = info})
        file:write(info_json .. '\n')
        file:flush()
        file:close()
    else
        log.error("open file err ",fname)
    end
end

local CMD = {}

function CMD.start(config)
    g_config = config
    SELF_ADDRESS = skynet.self()
    local node_list = config.node_list
    skynet.fork(function()
        for _,svr_name in ipairs(node_list) do
            g_time_map[svr_name] = timer_point:new(timer_point.EVERY_MINUTE):builder(monitor,svr_name)
        end
    end)
    return true
end

function CMD.fix_exit()
    contriner_client:instance("logrotate_m"):mod_send("cancel", SELF_ADDRESS)
    for _,time_obj in pairs(g_time_map) do
        --取消定时器
        time_obj:cancel()
    end
end

function CMD.exit()
    return true
end

return CMD