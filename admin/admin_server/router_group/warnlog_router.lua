local rsp_body = require "common.rsp_body"
local frpc_client = require "skynet-fly.client.frpc_client"
local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local skynet = require "skynet"
local log = require "skynet-fly.log"

local assert = assert
local tonumber = tonumber
local pairs = pairs
local table = table
local type = type

local g_ormobj = nil

return function(group)
    skynet.fork(function()
        local adapter = ormadapter_mysql:new("log_db")
        g_ormobj = ormtable:new("error_log")
        :string32("_guid")
        :uint8('_svr_type')
        :uint16('_svr_id')
        :uint32('_time')
        :text('_err_str')
        :set_keys('_guid')
        :set_index('time_index', '_time')
        :set_index("svr_index", '_svr_type', '_svr_id')
        :builder(adapter)
    end)

    group:post('/list',function(c)
        local body = c.req.body
        local cursor = body.cursor
        local pagenum = body.pagenum
        local limit = 20
        local sort = -1 --降序
        local sort_field_name = '_time'     --按时间排序
        local query = body.query
        if type(cursor) == 'userdata' then 
            cursor = nil
        end
        local cursor, res, count = g_ormobj:idx_get_entry_by_limit(cursor, limit, sort, sort_field_name, query)
        local list = {}
        for _, entry in pairs(res) do
            table.insert(list, entry:get_entry_data())
        end
        rsp_body.set_rsp(c, {
            cursor = cursor,
            list = list,
            count = count,
            pagenum = pagenum,
        })
    end)
end