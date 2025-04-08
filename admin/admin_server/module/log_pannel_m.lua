local log = require "skynet-fly.log"
local skynet = require "skynet"
local watch_syn_client = require "skynet-fly.rpc.watch_syn_client"
local SYN_CHANNEL_NAME = require "common.enum.SYN_CHANNEL_NAME"
local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local mysqli = require "skynet-fly.db.mysqli"
local watch_syn = require "skynet-fly.watch.watch_syn"
local queue = require "skynet.queue"()

local pairs = pairs
local ipairs = ipairs
local tunpack = table.unpack

local g_watch_server = nil
local g_orm_type_strs = {}
local g_orm_map = {}
local g_log_info_map = {}
do
    for str, type in pairs(ormtable.FIELD_TYPE) do
        g_orm_type_strs[type] = str
    end
end

local g_IGNORE_MAP = {
    ['_log_name'] = true
}

local function create_orm_obj(use_log_info, mysqlcli)
    local field_list = use_log_info.field_list
    local field_map = use_log_info.field_map
    local key_list = use_log_info.key_list
    local indexs_list = use_log_info.indexs_list
    local tab_name = use_log_info.tab_name
    --创建或者修改orm
    local adapter = ormadapter_mysql:new(nil, mysqlcli)
    local ormobj = ormtable:new(tab_name)
    --设置字段
    for _, field_name in ipairs(field_list) do
        if not g_IGNORE_MAP[field_name] then
            local field_type = field_map[field_name]
            local type_str = g_orm_type_strs[field_type]
            ormobj[type_str](ormobj, field_name)
        end
    end
    --设置主键
    ormobj:set_keys(tunpack(key_list))
    --设置普通索引
    for index_name, list in pairs(indexs_list) do
        ormobj:set_index(index_name, tunpack(list))
    end
    --构建
    ormobj:builder(adapter)

    g_orm_map[tab_name] = ormobj
    g_log_info_map[tab_name] = use_log_info

    g_watch_server:publish("log_info_map", g_log_info_map)
end

local CMD = {}

function CMD.get_log_list(log_name, cursor, limit, sort, sort_field_name, query, offset)
    local orm = g_orm_map[log_name]
    if not orm then
        return nil
    end
    local cursor, res, count = orm:idx_get_entry_by_limit(cursor, limit, sort, sort_field_name, query, offset)
    local list = {}
    for i = 1, #res do
        list[i] = res[i]:get_entry_data()
    end
    return true, cursor, list, count
end

function CMD.start(config)
    skynet.fork(function()
        local mysqlcli = mysqli.new_client('log_db')
        local node_map = config.node_map
        for svr_name in pairs(node_map) do
            watch_syn_client.pwatch(svr_name, SYN_CHANNEL_NAME.log_desc_info .. '*', "handle_name_1", function(cluster_name, use_log_info)
                queue(create_orm_obj, use_log_info, mysqlcli)
            end)
        end
    end)
    g_watch_server:register("log_info_map", g_log_info_map)
    return true
end

function CMD.exit()
    return true
end

g_watch_server = watch_syn.new_server(CMD)

return CMD