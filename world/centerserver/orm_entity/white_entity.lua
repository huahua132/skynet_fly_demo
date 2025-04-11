local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"

local pairs = pairs
local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

--白名单
function M.init()
    local adapter = ormadapter_mysql:new("orm_db")
    g_ormobj = ormtable:new("white")
    :int64('player_id')       --玩家ID
    :set_keys("player_id")
    :set_cache(0, 500)              --永久缓存，5秒同步一次更改
    :builder(adapter)

    return g_ormobj
end

M.handle = handle

return M