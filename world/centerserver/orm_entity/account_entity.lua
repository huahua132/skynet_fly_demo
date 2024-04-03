local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local module_info = require "skynet-fly.etc.module_info"

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
    :string32("key")                --密码key
    :int64("player_id")             --玩家ID
    :uint16("hall_server_id")       --大厅服ID
    :int64("create_time")           --创建时间
    :int64("last_login_time")       --最后登录时间
    :int16("channel")               --注册渠道
    :set_keys("account")
    :set_cache(60 * 60 * 100, 500, 100000)    --缓存1个小时，5秒同步一次更改,最大缓存10万条数据
    :builder(adapter)
    return g_ormobj
end

M.handle = handle

return M