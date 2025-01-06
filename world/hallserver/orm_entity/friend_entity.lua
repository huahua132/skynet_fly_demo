local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local skynet = require "skynet"
local env_util = require "skynet-fly.utils.env_util"

local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

--玩家信息
function M.init()
    local adapter = ormadapter_mysql:new("orm_db")
    g_ormobj = ormtable:new("friend")
    :int64("player_id")         --玩家id
    :int64("friend_id")         --好友id
    :int64("create_time")       --创建时间
    :set_keys("player_id", "friend_id")
    :set_cache(60 * 60 * 100, 500, 100000)    --缓存1个小时，5秒同步一次更改，最大缓存10万条数据
    :builder(adapter)
    return g_ormobj
end

M.handle = handle

return M