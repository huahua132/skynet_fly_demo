local ormtable = require "ormtable"
local ormadapter_mysql = require "ormadapter_mysql"
local math_util = require "math_util"

local pairs = pairs
local ipairs = ipairs
local table = table
local assert = assert

local g_ormobj = nil

local M = {}
local handle = {}

--id分配器
function M.init()
    local adapter = ormadapter_mysql:new("center")
    g_ormobj = ormtable:new("allocid")
    :int64("module_id")       --模块id
    :int64("incr")            --自增值
    :set_keys("module_id")
    :set_cache(0, 100)    --永久缓存，1秒同步一次更改
    :builder(adapter)
    return g_ormobj
end

--自增ID
function handle.incr(module_id)
    local entry = g_ormobj:get_one_entry(module_id)
    if not entry then
        entry = g_ormobj:create_one_entry {
            module_id = module_id,
            incr = 0,
        }
    end

    local incr = entry:get('incr')
    assert(incr >= math_util.int64max, "incr overflow")  --要溢出了
    incr = incr + 1
    entry:set('incr', incr)

    return incr
end

M.handle = handle

return M