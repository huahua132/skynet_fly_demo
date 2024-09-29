local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local contriner_interface = require "skynet-fly.contriner.contriner_interface"
local timer_point = require "skynet-fly.time_extend.timer_point"
local time_util = require "skynet-fly.utils.time_util"
local skynet = require "skynet"
local env_util = require "skynet-fly.utils.env_util"
local GAME_ID_ENUM = require "common.enum.GAME_ID_ENUM"

local svr_id = env_util.get_svr_id()

local pairs = pairs
local ipairs = ipairs
local table = table
local assert = assert
local os = os
local tonumber = tonumber

local g_ormobj = nil

local M = {}
local handle = {}

--对局记录
function M.init()
    local adapter = ormadapter_mysql:new("game_" .. svr_id)
    g_ormobj = ormtable:new("newrecord_" .. GAME_ID_ENUM.chinese_chess)
    :int64("create_time")       --创建时间
    :string64("table_id")       --桌子ID
    :text("details")            --详情信息
    :set_keys("create_time", "table_id")
    :set_cache(10 * 60 * 100, 500, 10000)    --缓存10分钟，5秒同步一次更改，最大缓存1万条数据
    :builder(adapter)

    assert(g_ormobj, "builder err")

    timer_point:new(timer_point.EVERY_DAY):builder(function()
        --每天删除一次两天前的数据
        local pre_time = time_util.day_time(-2, 0, 0, 0)
        g_ormobj:delete_entry_by_range(pre_time)
    end)

    return g_ormobj
end

M.handle = handle

return M