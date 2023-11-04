local rsp_body = require "rsp_body"
local contriner_client = require "contriner_client"
local cache_help = require "cache_help"
local timer = require "timer"
local time_util = require "time_util"
local file_util = require "file_util"
local log = require "log"
local cjson_safe = require 'cjson.safe'

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
local g_file_cache = cache_help:new(timer.minute)  --本地缓存

-- ['chinese_chess:1'] : {
--     ['mem']: {
--         time : ["09:54","09:55","09:56","09:57","09:58","09:59","10:00"],
--         servers : {
--             hot: [100.00, 120.23, 161.45, 134, 105, 160, 165],
--             room_game: [120, 82, 91, 154, 162, 140, 145],
--             dummy : [50, 2, 4, 6654, 77, 77, 4],
--             slave : [0.024091,1,2,5,7,9,10.223],
--             master : [1524,2222,6666,9999,4444,1111,1111],
--         }
--     },
--     ['cpu']: {
--         time: ["09:54","09:55","09:56","09:57","09:58","09:59","10:00"],
--         servers: {
--             hot: [100.00, 120.23, 20.45, 134, 105, 160, 165],
--             room_game: [120, 82, 91, 20, 162, 140, 145],
--             dummy : [50, 2, 4, 20, 77, 77, 4],
--             slave : [0.024091,1,10,5,7,9,10.223],
--             master : [25,50,60,70,80,1000,2000],
--         }
--     },
-- },

local function get_log_file_info(cluster_name, pre_day)
    local file_path = ""
    if pre_day == 0 then --今天
        file_path = string.format('%s%s.log',g_monitor_log_dir,cluster_name)
    else
        local pre_time = time_util.day_time(-pre_day)     --前几天
        local date = os.date(pre_time)
        file_path = string.format('%s%s%s.log',g_monitor_log_dir,date,cluster_name)
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

local function get_register_map()
    if not next(g_register_map) then
        g_register_map,g_monitor_log_dir = contriner_client:instance("monitor_m"):mod_call("get_rigister_info")
        for cluster_name,_ in pairs(g_register_map) do
            tinsert(g_cluster_list,cluster_name)
        end
    end

    return g_register_map,g_cluster_list
end

return function(group)
    group:get('/cluster_list',function(c)
        local _,cluster_list = get_register_map()
        c.res:set_json_rsp(rsp_body.ok_rsp(cluster_list))
    end)

    group:get('/info',function(c)
        get_register_map()
        local query = c.req.query
        log.info(query)
        local cluster_name = assert(query.cluster_name, "not cluster_name") --集群服务的名字
        local pre_day = assert(query.pre_day,"not pre_day")                 --前几天
        pre_day = tonumber(pre_day)
        assert(pre_day >= 0, "pre day err")
        assert(g_register_map[cluster_name], "cluster_name not exists")          --不存在
        
        local ret,info_list = get_log_file_info(cluster_name, pre_day)

        c.res:set_json_rsp(rsp_body.ok_rsp{
            result = ret,
            data = info_list,
        })
    end)
end