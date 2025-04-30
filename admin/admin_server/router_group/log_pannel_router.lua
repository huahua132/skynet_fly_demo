local rsp_body = require "common.rsp_body"
local skynet = require "skynet"
local log = require "skynet-fly.log"
local watch_syn = require "skynet-fly.watch.watch_syn"
local contriner_watch_interface = require "skynet-fly.watch.interface.contriner_watch_interface"
local contriner_client = require "skynet-fly.client.contriner_client"
local CODE = require "common.enum.CODE"

contriner_client:register("log_pannel_m")

local assert = assert
local tonumber = tonumber
local pairs = pairs
local table = table
local type = type

local g_log_info_map = {}
local g_log_name_list = {}

local function set_log_name_list()
    g_log_info_map['error_log'] = nil
    local list = {}
    for tab_name in pairs(g_log_info_map) do
        table.insert(list, tab_name)
    end

    table.sort(list)
    g_log_name_list = list
end

return function(group)
    skynet.fork(function()
        local interface = contriner_watch_interface:new("log_pannel_m")
        local watch_cli = watch_syn.new_client(interface)
        watch_cli:watch("log_info_map")
        g_log_info_map = watch_cli:await_get("log_info_map")
        set_log_name_list()
        while watch_cli:is_watch("log_info_map") do
            g_log_info_map = watch_cli:await_update("log_info_map")
            set_log_name_list()
        end
    end)

    --日志名信息
    group:get('/log_name_list', function(c)
        rsp_body.set_rsp(c, g_log_name_list)
    end)

    --日志详情
    group:get('/log_desc/:logname', function(c)
        local params = c.params
        local logname = params.logname or ""
        local log_info = g_log_info_map[logname]
        if not log_info then
            rsp_body.set_rsp(c, nil ,CODE.ERR_PARAM, "not logname")
            return
        end

        rsp_body.set_rsp(c, log_info)
    end)

    --查询日志数据
    group:post('/log_list', function(c)
        local body = c.req.body
        local logname = body.logname
        local cursor = body.cursor
        local pagenum = body.pagenum
        local next_offset = body.next_offset 
        local limit = 20
        local sort = -1 --降序
        local sort_field_name = '_time'     --按时间排序
        local query = body.query
        if type(cursor) == 'userdata' then 
            cursor = nil
        end
        --log.info("log_list req >>> ", logname, cursor, limit, sort, sort_field_name, query, next_offset)
        local isok, cursor, res, count, next_offset = contriner_client:instance("log_pannel_m"):mod_call('get_log_list', logname, cursor, limit, sort, sort_field_name, query, next_offset)
        local guid_list = {}
        local time_list = {}
        for i, oneret in ipairs(res) do
            table.insert(guid_list, oneret._guid)
            table.insert(time_list, oneret._time)
        end
        -- log.info("guid_list >>> ", table.concat(guid_list, ","))
        -- log.info("time_list >>> ", table.concat(time_list, ","))
        -- log.info("log_list res >>> ", isok, cursor, count, next_offset)
        if not isok then
            rsp_body.set_rsp(c, nil ,CODE.ERR_SERVER, "err server")
            return
        end
        local list = res
        rsp_body.set_rsp(c, {
            logname = logname,
            cursor = cursor,
            list = list,
            count = count,
            pagenum = pagenum,
            next_offset = next_offset,
        })
    end)
end