local ormtable = require "ormtable"
local ormadapter_mysql = require "ormadapter_mysql"

local pairs = pairs
local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

function M.init()
    local adapter = ormadapter_mysql:new("admin")
    g_ormobj = ormtable:new("roles")
    :string64("name")
    :string512("description")
    :string8192("routes")
    :set_keys("name")
    :set_cache(0,100)    --永久缓存，1秒同步一次更改
    :builder(adapter)
    return g_ormobj
end

function M.call(func_name, ...)
    return handle[func_name](...)
end

--查询所有
function handle.get_all()
    local entity_list = g_ormobj:get_all_entry()
    local res = {}
    for _, entry in ipairs(entity_list) do
        table.insert(res, entry:get_entry_data())
    end

    return res
end

--添加
function handle.add(entry_data)
    local entry_list = g_ormobj:create_entry(entry_data)
    if #entry_list <= 0 then return end
    local entry = entry_list[1]
    return entry:get('name')
end

--修改
function handle.update(entry_data)
    local name = entry_data.name
    local entry_list = g_ormobj:get_entry(entry_data.name)
    if #entry_list <= 0 then return false end

    local entry = entry_list[1]
    local old_data = entry:get_entry_data()

    for k,v in pairs(old_data) do
        local new_v = entry_data[k]
        if new_v then
            entry:set(k, new_v)
        end
    end

    return true
end

--删除
function handle.delete(name)
    return g_ormobj:delete_entry(name)
end

return M