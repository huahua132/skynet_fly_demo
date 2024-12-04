-------------------------------------------------------
--监控在线
-------------------------------------------------------
local skynet = require "skynet"
local frpc_client = require "skynet-fly.client.frpc_client"
local timer_point = require "skynet-fly.time_extend.timer_point"
local string_util = require "skynet-fly.utils.string_util"
local time_util = require "skynet-fly.utils.time_util"
local math_util = require "skynet-fly.utils.math_util"
local logrotate = require "skynet-fly.logrotate"
local player_util = require "common.utils.player"
local json = require "cjson"
local log = require "skynet-fly.log"
local regiter = require "common.redis.count.regiter"
local tti = require "skynet-fly.cache.tti"
local file_util = require "skynet-fly.utils.file_util"
local skynet_util = require "skynet-fly.utils.skynet_util"

local g_file_cache = tti:new(time_util.DAY, function(key, file)
    file:flush()
    file:close()
end)

local function close_cache()
    for key,file in g_file_cache:pairs() do
        file:flush()
        file:close()
        g_file_cache:update_cache(key, "closed")
    end
end

--关服shutdown 处理
skynet_util.reg_shutdown_func(close_cache)

local os = os
local tonumber = tonumber
local ipairs = ipairs
local pairs = pairs
local io = io
local string = string
local error = error
local assert = assert
local next = next

local g_config = nil
local g_time_map = {}
local g_rigister_info = {}

local g_monitor_log_dir = "./monitor_online_log/"

local TAR_TIMER_POINT_TYPE = {
    online = timer_point.EVERY_MINUTE,          --在线打点
    regiter = timer_point.EVERY_DAY,            --注册打点
}

local TAG_TIMER_POINT_CFG = {
    online = {
        max_age = 7,
    },
    regiter = {
        max_age = 60,
        point_type = timer_point.EVERY_MOUTH,  --每个月切割一次
    }
}

local function rigister_rotate(svr_name, file_path, file_name, tag)
    if g_rigister_info[svr_name] then
        return
    end

    local cfg = assert(TAG_TIMER_POINT_CFG[tag], "not exists tag :" .. tag)

    g_rigister_info[svr_name] = file_name
    logrotate:new(file_name):set_file_path(file_path):set_max_age(cfg.max_age):set_point_type(cfg.point_type):builder()
end

local function write_info(svr_name, tag, infostr)
    local file_path = g_monitor_log_dir .. svr_name .. '/'
    local file_name = tag .. '.log'
    local fname = string.format("%s%s",file_path,file_name)
    local isok, err = file_util.mkdir(file_path)
    if not isok then
        error("create g_monitor_log_dir err:" .. err)
    end
    rigister_rotate(svr_name, file_path, file_name, tag)
    local file = g_file_cache:get_cache(fname)
    if not file then
        file = io.open(fname, 'a+')
    end
    if file then
        if file ~= 'closed' then
            file:write(infostr .. '\n')
            g_file_cache:set_cache(fname, file)
        end
    else
        log.error("open file err ",fname)
    end
end

local EXCUTE_LOOP = {}
--在线打点
EXCUTE_LOOP['online'] = function(svr_name, tag)
    local isok, err = file_util.mkdir(g_monitor_log_dir)
    if not isok then
        error("create g_monitor_log_dir err:" .. err)
    end

    local cur_date = os.date("%H:%M:%S", time_util.time())
    local player_cli = frpc_client:instance(svr_name, "room_game_hall_m")
    local ret = player_cli:all_broadcast_call("get_all_online")
    if not ret then return end
    
    local info = {
        total = 0,   --总在线
    }

    for _,v in ipairs(ret) do
        local cluster_name = v.cluster_name
        local svr_id = string_util.split(cluster_name, ':')[2]
        local result = v.result
        for server_id, retlist in pairs(result) do
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
    write_info(svr_name, tag, json.encode({[cur_date] = info}))
end

--注册打点
EXCUTE_LOOP['regiter'] = function(svr_name, tag)
    local isok, err = file_util.mkdir(g_monitor_log_dir)
    if not isok then
        error("create g_monitor_log_dir err:" .. err)
    end

    local pre_date = os.date("%Y%m%d",time_util.day_time(-1, 0, 0, 0))
    local info = regiter.get_predayinfo()
    if not info or not next(info) then
        return
    end

    write_info(svr_name, tag, json.encode({[pre_date] = info}))
end

local CMD = {}

function CMD.get_node_map()
    return g_config.node_map, g_monitor_log_dir
end

function CMD.start(config)
    g_config = config
    local node_map = config.node_map
    skynet.fork(function()
        for svr_name,tag_map in pairs(node_map) do
            g_time_map[svr_name] = {}
            for tag in pairs(tag_map) do
                local handle = assert(EXCUTE_LOOP[tag], "not exists tag handle " .. tag)
                local point_type = assert(TAR_TIMER_POINT_TYPE[tag], "not exists tag point type " .. tag)
                assert(TAG_TIMER_POINT_CFG[tag], "not exists tag cfg " .. tag)
                g_time_map[svr_name][tag] = timer_point:new(point_type):builder(handle, svr_name, tag)
            end
        end
    end)
    return true
end

function CMD.fix_exit()
    for _,tag_map in pairs(g_time_map) do
        for _,time_obj in pairs(tag_map) do
            --取消定时器
            time_obj:cancel()
        end
    end
    close_cache()
end

function CMD.exit()
    return true
end

return CMD