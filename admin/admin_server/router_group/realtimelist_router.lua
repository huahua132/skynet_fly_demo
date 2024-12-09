local rsp_body = require "common.rsp_body"
local contriner_client = require "skynet-fly.client.contriner_client"
local frpc_client = require "skynet-fly.client.frpc_client"
local timer = require "skynet-fly.timer"
local time_util = require "skynet-fly.utils.time_util"
local file_util = require "skynet-fly.utils.file_util"
local log = require "skynet-fly.log"
local cjson_safe = require 'cjson.safe'
local table_util = require "skynet-fly.utils.table_util"
local string_util = require "skynet-fly.utils.string_util"
local math_util = require "skynet-fly.utils.math_util"

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

local g_register_map = {}
local g_cluster_list = {}

local function get_register_map()
    if not next(g_register_map) then
        g_register_map = contriner_client:instance("monitor_m"):mod_call("get_rigister_info")
        for cluster_name,server_map in pairs(g_register_map) do
            tinsert(g_cluster_list,cluster_name)
        end
    end

    return g_register_map,g_cluster_list
end

return function(group)
    group:get('/cluster_list',function(c)
        local _,cluster_list = get_register_map()
        rsp_body.set_rsp(c,{
            cluster_list = cluster_list
        })
    end)

    group:get('/info',function(c)
        get_register_map()
        local query = c.req.query
        local cluster_name = assert(query.cluster_name, "not cluster_name") --集群服务的名字
        assert(g_register_map[cluster_name], "cluster_name not exists")          --不存在
        local split_str = string_util.split(cluster_name,'-')
        assert(#split_str == 2, "err cluster_name " .. cluster_name)
        local svr_name,svr_id = split_str[1],tonumber(split_str[2])

        local info_list = {}
        local instance = frpc_client:instance(svr_name,"debug_console_m"):set_svr_id(svr_id)

        local ret = instance:byid_mod_call('call','mem')
        if ret then
            for server_id,server_info in pairs(ret.result[1]) do
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

                info_list[server_id] = {
                    mem = mem,
                    name = name,
                    launch_date = launch_date,
                    version = version,
                }
            end
        end

        local ret = instance:byid_mod_call('call','stat')
        if ret then
            for server_id,server_info in pairs(ret.result[1]) do
                info_list[server_id].task = server_info.task
                info_list[server_id].mqlen = server_info.mqlen
                info_list[server_id].cpu = server_info.cpu
                info_list[server_id].message = server_info.message
            end
        end

        --c 内存信息
        local ret = instance:byid_mod_call('call','cmem')
        if ret then
            for server_id,cmem in pairs(ret.result[1]) do
                if info_list[server_id] then
                    info_list[server_id].cmem = tonumber(math_util.number_div_str(cmem / 1024 * 100, 2))  --kb 保持2位小数
                end
            end
        end
        
        rsp_body.set_rsp(c,info_list)
    end)
end