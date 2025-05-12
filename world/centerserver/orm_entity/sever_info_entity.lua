local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local SERVER_SWITCH_STATUS = require "common.enum.SERVER_SWITCH_STATUS"

local pairs = pairs
local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

--服务信息
function M.init()
    local adapter = ormadapter_mysql:new("orm_db")
    g_ormobj = ormtable:new("server_info")
    :string64('cluster_name')       --集群名
    :uint8('status')                --服务状态 0未开启  1已开启
    :uint8('switch')                --服务开关 0关闭 1关闭入口状态 2白名单 3开启
    :set_keys("cluster_name")
    :set_cache(0, 500)              --永久缓存，5秒同步一次更改
    :builder(adapter)

    return g_ormobj
end

--获取服务信息
function handle.get_server_info(cluster_name)
    local entry = g_ormobj:get_one_entry(cluster_name)
    if not entry then
        entry = g_ormobj:create_one_entry({cluster_name = cluster_name, status = 1, switch = SERVER_SWITCH_STATUS.OPEN})
    end

    return entry:get_entry_data()
end

--改变服务状态
function handle.change_status(cluster_name, status)
    local entry = g_ormobj:get_one_entry(cluster_name)
    if not entry then
        return false
    end

    entry:set('status', status)
    return true
end

--改变开关值
function handle.change_switch(cluster_name, switch)
    local entry = g_ormobj:get_one_entry(cluster_name)
    if not entry then
        return false
    end

    entry:set('switch', switch)
    return true
end

M.handle = handle

return M