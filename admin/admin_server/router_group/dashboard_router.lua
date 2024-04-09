local rsp_body = require "common.rsp_body"
local contriner_client = require "skynet-fly.client.contriner_client"
local cluster_client = require "skynet-fly.client.cluster_client"
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

contriner_client:register("monitor_online_m")

local g_monitor_log_dir = nil
local g_node_map = {}
local g_cluster_servers_map = {}
local g_file_cache = tti:new(timer.minute)  --本地缓存

local function get_log_file_info(svr_name, pre_day)
    local file_path = g_monitor_log_dir .. '/'
    if pre_day == 0 then --今天
        file_path = string.format('%s%s.log',file_path,svr_name)
    else
        local pre_time = time_util.day_time(-pre_day + 1,0,0,0)     --前几天
        local date = os.date("%Y%m%d",pre_time)
        file_path = string.format('%s%s_%s.log',file_path,date,svr_name)
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

local function get_node_map()
    if not next(g_node_map) then
        local node_list 
        node_list,g_monitor_log_dir = contriner_client:instance("monitor_online_m"):mod_call("get_node_list")
        for _,svr_name in ipairs(node_list) do
            g_node_map[svr_name] = true
        end
    end

    return g_node_map
end

return function(group)
    group:get('/node_list',function(c)
        local node_map = get_node_map()
        rsp_body.set_rsp(c,{
            node_map = node_map,
        })
    end)

    group:get('/online_record',function(c)
        get_node_map()
        local query = c.req.query
        local svr_name = assert(query.svr_name, "not svr_name") --集群服务的名字
        local pre_day = assert(query.pre_day,"not pre_day")                 --前几天
        pre_day = tonumber(pre_day)
        assert(pre_day >= 0, "pre day err")
        assert(g_node_map[svr_name], "svr_name not exists")          --不存在
        
        local ret,info_list = get_log_file_info(svr_name, pre_day)

        rsp_body.set_rsp(c,{
            result = ret,
            data = info_list,
        })
    end)
end