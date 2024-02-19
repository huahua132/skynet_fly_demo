local ormtable = require "ormtable"
local ormadapter_mysql = require "ormadapter_mysql"
local module_info = require "module_info"

local pairs = pairs
local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

--账号
function M.init()
    local index = module_info.get_base_info().index
    local adapter = ormadapter_mysql:new("center")
    g_ormobj = ormtable:new("account_" .. index)
    :string32("account")
    :string256("password")
    :string32("key")
    :int64("create_time")
    :int64("last_login_time")
    :set_keys("account")
    :set_cache(60 * 5,100)    --缓存5分钟，1秒同步一次更改
    :builder(adapter)
    return g_ormobj
end

M.handle = handle

return M