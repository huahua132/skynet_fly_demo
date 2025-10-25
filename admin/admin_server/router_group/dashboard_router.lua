local rsp_body = require "common.rsp_body"
local container_client = require "skynet-fly.client.container_client"
local tti = require "skynet-fly.cache.tti"
local timer = require "skynet-fly.timer"
local time_util = require "skynet-fly.utils.time_util"
local file_util = require "skynet-fly.utils.file_util"
local log = require "skynet-fly.log"
local cjson_safe = require 'cjson.safe'
local table_util = require "skynet-fly.utils.table_util"
local string_util = require "skynet-fly.utils.string_util"

local assert = assert
local next = next
local pairs = pairs
local tinsert = table.insert
local string = string
local os = os
local io = io
local tonumber = tonumber
local ipairs = ipairs

container_client:register("monitor_online_m")

local g_monitor_log_dir = nil
local g_node_map = {}
local g_file_cache = tti:new(timer.minute)  --本地缓存
local g_pre_load_time = 0

local function get_log_file_info(svr_name, tag, date)
    local file_path = g_monitor_log_dir .. svr_name .. '/'
    if date == 'cur' then --今天
        file_path = string.format('%s%s.log',file_path,tag)
    else
        file_path = string.format('%s%s_%s.log',file_path,date,tag)
    end

    log.info("get_log_file >>> ",file_path)
    local cache = g_file_cache:get_cache(file_path)
    if cache then
        return "OK",cache
    end
    
    local file = io.open(file_path,"r")
    if not file then
        return "not exists"
    end

    local new_body = {}
    for line in file:lines() do
        local one_info = cjson_safe.decode(line)
        if one_info and next(one_info) then
            tinsert(new_body,one_info)
        end
    end

    g_file_cache:set_cache(file_path,new_body)
    return "OK",new_body
end

local function get_node_files(node_map)
    if not time_util.is_cross_day(g_pre_load_time) then
        return
    end
    g_pre_load_time = time_util.time()

    for svr_name, tag_map in pairs(node_map) do
        for tag in pairs(tag_map) do
            tag_map[tag] = {}
            tag_map[tag]['cur'] = true
        end

        local file_path = g_monitor_log_dir .. svr_name
        for filename in file_util.diripairs(file_path) do
            local b,e = string.find(filename, '_', nil, true)
            if b then
                --20240410_online.log
                local date = filename:sub(1, b - 1)                 --20240410
                local tag = filename:sub(e + 1, filename:len() - 4) --online
                if tag_map[tag] then
                    tag_map[tag][date] = true
                end
            end
        end
    end
end

local function get_node_map()
    if not next(g_node_map) then
        g_node_map,g_monitor_log_dir = container_client:instance("monitor_online_m"):mod_call("get_node_map")
    end
    get_node_files(g_node_map)
    return g_node_map
end

return function(group)
    group:get('/node_map',function(c)
        local node_map = get_node_map()
        rsp_body.set_rsp(c,{
            node_map = node_map,
        })
    end)

    group:get('/online_record',function(c)
        get_node_map()
        local query = c.req.query
        local svr_name = assert(query.svr_name, "not svr_name") --集群服务的名字
        local date = assert(query.date, "not date")             --文件日期
        local tag = assert(query.tag, "not tag")                --是在线 还是啥
        local tag_map = assert(g_node_map[svr_name], "svr_name not exists")          --不存在
        local date_map = assert(tag_map[tag], "tag not exists")                  --不存在
        assert(date_map[date], "not exists date " .. date)
        local ret,info_list = get_log_file_info(svr_name, tag, date)

        rsp_body.set_rsp(c,{
            result = ret,
            data = info_list,
        })
    end)
end