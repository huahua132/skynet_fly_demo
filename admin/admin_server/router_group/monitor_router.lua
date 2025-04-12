local rsp_body = require "common.rsp_body"
local contriner_client = require "skynet-fly.client.contriner_client"
local frpc_client = require "skynet-fly.client.frpc_client"
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

contriner_client:register("monitor_m")

local g_monitor_log_dir = nil
local g_register_map = {}
local g_cluster_list = {}
local g_cluster_servers_map = {}
local g_file_cache = tti:new(timer.minute)  --本地缓存

local function get_log_file_info(cluster_name, server_name, pre_day)
    local file_path = g_monitor_log_dir..cluster_name .. '/'
    if pre_day == 0 then --今天
        file_path = string.format('%s%s.log',file_path,server_name)
    else
        local pre_time = time_util.day_time(-pre_day + 1,0,0,0)     --前几天
        local date = os.date("%Y%m%d",pre_time)
        file_path = string.format('%s%s_%s.log',file_path,date,server_name)
    end

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

local function get_register_map()
    if not next(g_register_map) then
        g_register_map,g_monitor_log_dir = contriner_client:instance("monitor_m"):mod_call("get_rigister_info")
        for cluster_name,server_map in pairs(g_register_map) do
            tinsert(g_cluster_list,cluster_name)
            g_cluster_servers_map[cluster_name] = {}
            
            for server_name,_ in table_util.sort_ipairs(server_map, nil) do
                tinsert(g_cluster_servers_map[cluster_name], server_name)
            end
        end
    end

    return g_register_map,g_cluster_list,g_cluster_servers_map
end

return function(group)
    group:get('/cluster_list',function(c)
        local _,cluster_list,server_map = get_register_map()
        rsp_body.set_rsp(c,{
            cluster_list = cluster_list,
            server_map = server_map,
        })
    end)

    group:get('/info',function(c)
        get_register_map()
        local query = c.req.query
        local cluster_name = assert(query.cluster_name, "not cluster_name") --集群服务的名字
        local server_name = assert(query.server_name, "not server_name")    --服务名字
        local pre_day = assert(query.pre_day,"not pre_day")                 --前几天
        pre_day = tonumber(pre_day)
        assert(pre_day >= 0, "pre day err")
        assert(g_register_map[cluster_name], "cluster_name not exists")          --不存在
        
        local ret,info_list = get_log_file_info(cluster_name, server_name, pre_day)

        rsp_body.set_rsp(c,{
            result = ret,
            data = info_list,
        })
    end)
end