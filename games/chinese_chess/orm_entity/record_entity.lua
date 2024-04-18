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
    g_ormobj = ormtable:new("record_" .. GAME_ID_ENUM.chinese_chess)
    :uint32("date")             --日期
    :string64("id")             --对局ID
    :int64("create_time")       --创建时间
    :text("details")            --详情信息
    :set_keys("date", "id")
    :set_cache(60 * 60 * 100, 500, 10000)    --缓存10分钟，5秒同步一次更改，最大缓存1万条数据
    :builder(adapter)

    assert(g_ormobj, "builder err")

    timer_point:new(timer_point.EVERY_DAY):builder(function()
        --每天删除一次前第2天的数据
        local pre_time = time_util.day_time(-2, 0, 0, 0)
        local pre_date = tonumber(os.date("%Y%m%d", pre_time))
        g_ormobj:delete_entry(pre_date)
    end)

    return g_ormobj
end

M.handle = handle

return M