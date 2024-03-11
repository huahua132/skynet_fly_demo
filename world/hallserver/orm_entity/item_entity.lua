local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local math_util = require "skynet-fly.utils.math_util"
local skynet = require "skynet"

local svr_id = tonumber(skynet.getenv('svr_id'))

local pairs = pairs
local ipairs = ipairs
local table = table
local assert = assert
local tostring = tostring

local g_ormobj = nil

local M = {}
local handle = {}

--玩家信息
function M.init()
    local adapter = ormadapter_mysql:new("hall_" .. svr_id)
    g_ormobj = ormtable:new("item")
    :int64("player_id")   --玩家id
    :int64("id")          --道具ID
    :int64("count")       --道具数量
    :set_keys("player_id","id")
    :set_cache(60 * 60,100)    --缓存1个小时，1秒同步一次更改
    :builder(adapter)
    return g_ormobj
end

--增加道具
function handle.add_item(player_id, id, num)
    assert(player_id > 0, "err player_id " .. tostring(player_id))
    assert(id > 0, "err id " .. tostring(id))
    assert(num > 0, "err num ".. tostring(num))
    local entry = g_ormobj:get_one_entry(player_id, id)
    if not entry then
        entry = g_ormobj:create_one_entry({
            player_id = player_id,
            id = id,
            count = 0,
        })
    end

    local count = entry:get("count")
    count = count + num
    entry:set("count", count)
    return count
end

--扣除道具
function handle.reduce_item(player_id, id, num)
    assert(player_id > 0, "err player_id " .. tostring(player_id))
    assert(id > 0, "err id " .. tostring(id))
    assert(num > 0, "err num ".. tostring(num))
    local entry = g_ormobj:get_one_entry(player_id, id)
    if not entry then
        entry = g_ormobj:create_one_entry({
            player_id = player_id,
            id = id,
            count = 0,
        })
    end

    local count = entry:get("count")
    if count - num < 0 then
        return false, count
    end

    count = count - num
    entry:set("count", count)
    return true, count
end

--获取道具
function handle.get_item(player_id, id)
    assert(player_id > 0, "err player_id " .. tostring(player_id))
    assert(id > 0, "err id " .. tostring(id))
    local entry = g_ormobj:get_one_entry(player_id, id)
    if not entry then
        entry = g_ormobj:create_one_entry({
            player_id = player_id,
            id = id,
            count = 0,
        })
    end

    local count = entry:get("count")
    return count
end

M.handle = handle

return M