local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"

local pairs = pairs
local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

--全服邮件
function M.init()
    local adapter = ormadapter_mysql:new("center")
    g_ormobj = ormtable:new("global_email")
    :int64("guid")
    :string256("title")             --标题
    :string8192("context")          --内容
    :table("item_list")             --奖励道具
    :int64("vaild_time")            --有效时间 0 表示永久生效
    :set_keys("guid")
    :set_cache(0, 500)              --永久缓存，5秒同步一次更改
    :builder(adapter)

    return g_ormobj
end

M.handle = handle

return M