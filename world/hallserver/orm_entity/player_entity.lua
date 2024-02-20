local ormtable = require "ormtable"
local ormadapter_mysql = require "ormadapter_mysql"
local skynet = require "skynet"

local svr_id = tonumber(skynet.getenv('svr_id'))

local pairs = pairs
local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

--玩家信息
function M.init()
    local adapter = ormadapter_mysql:new("hall_" .. svr_id)
    g_ormobj = ormtable:new("player")
    :int64("player_id")         --玩家id
    :string32("nickname")       --昵称
    :int8("sex")                --性别
    :uint16("level")            --等级
    :uint16("viplevel")         --vip等级
    :string256("head_url")      --头像url
    :set_keys("player_id")
    :set_cache(60 * 5,100)    --缓存5分钟，1秒同步一次更改
    :builder(adapter)
    return g_ormobj
end

M.handle = handle

return M