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

M.handle = handle

return M