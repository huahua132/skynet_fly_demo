local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local skynet = require "skynet"
local env_util = require "skynet-fly.utils.env_util"
local time_util = require "skynet-fly.utils.time_util"
local log = require "skynet-fly.log"

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

--玩家信息
function M.init()
    local adapter = ormadapter_mysql:new("hall_" .. svr_id)
    g_ormobj = ormtable:new("game_record")
    :int64("player_id")         --玩家id
    :uint32("date")             --日期
    :string64("id")             --对局ID
    :int64("create_time")       --创建时间
    :int8("is_win")             --是否赢
    :uint16("game_id")          --游戏ID
    :set_keys("player_id", "date", "id")
    :set_cache(10 * 60 * 100, 500, 100000)    --缓存10分钟，5秒同步一次更改，最大缓存10万条数据
    :builder(adapter)

    return g_ormobj
end

--新增记录
function handle.add_record(player_id, date, id, is_win, game_id)
    local entry = g_ormobj:create_one_entry({
        player_id = player_id,
        date = date,
        id = id,
        is_win = is_win,
        create_time = time_util.time(),
        game_id = game_id,
    })
    
    if not entry then
        return
    end

    --只保留最近7天，100条记录
    local pre_time = time_util.day_time(-7, 0, 0, 0)  --7天以前的时间戳
    local pre_date = tonumber(os.date("%Y%m%d", pre_time))
    local entry_list = g_ormobj:get_entry(player_id)
    for i = 1,#entry_list do
        local entry = entry_list[i]
        local date = entry:get('date')
        if date <= pre_date then    --7天前的删除
            g_ormobj:delete_entry(player_id, date)
        end
    end

    entry_list = g_ormobj:get_entry(player_id)
    table.sort(entry_list, function(a, b)
        return a:get('create_time') < b:get('create_time')
    end)
    --保留100条
    for i = #entry_list, 100 + 1, -1 do
        local entry = entry_list[i]
        local date = entry:get('date')
        local id = entry:get('id')
        g_ormobj:delete_entry(player_id, date, id)
    end
end

M.handle = handle

return M