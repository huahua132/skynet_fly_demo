local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local skynet = require "skynet"
local env_util = require "skynet-fly.utils.env_util"

local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

--杂项数据
function M.init()
    local adapter = ormadapter_mysql:new("orm_db")
    g_ormobj = ormtable:new("misc")
    :int64("player_id")             --玩家id
    :int64("login_reward_time")     --上次登录发放奖励的时间
    :set_keys("player_id")
    :set_cache(30 * 60 * 100, 500, 100000)    --缓存半个小时，5秒同步一次更改，最大缓存10万条数据
    :builder(adapter)
    return g_ormobj
end

M.handle = handle

return M