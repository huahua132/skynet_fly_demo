local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local math_util = require "skynet-fly.utils.math_util"
local env_util = require "skynet-fly.utils.env_util"
local skynet = require "skynet"

local pairs = pairs
local ipairs = ipairs
local table = table
local assert = assert
local tostring = tostring
local tinsert = table.insert

local g_ormobj = nil

local M = {}
local handle = {}

--玩家信息
function M.init()
    local adapter = ormadapter_mysql:new("orm_db")
    g_ormobj = ormtable:new("item")
    :int64("player_id")   --玩家id
    :int64("id")          --道具ID
    :int64("count")       --道具数量
    :set_keys("player_id","id")
    :set_cache(60 * 60 * 100, 500, 100000)    --缓存1个小时，5秒同步一次更改, 最大缓存10万条数据
    :builder(adapter)
    return g_ormobj
end

--增加道具
function handle.add_item(player_id, id, num)
    assert(player_id > 0, "err player_id " .. tostring(player_id))
    assert(id > 0, "err id " .. tostring(id))
    assert(num >= 0, "err num ".. tostring(num))
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
    assert(num >= 0, "err num ".. tostring(num))
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

--批量查询道具
function handle.get_item_map(player_id, id_list)
    assert(player_id > 0, "err player_id " .. tostring(player_id))
    local entry_list = g_ormobj:get_entry_by_in(id_list, player_id)
    local ret_map = {}
    for i = 1, #entry_list do
        local entry = entry_list[i]
        local id = entry:get("id")
        local count = entry:get("count")
        ret_map[id] = count
    end

    local add_list = {}
    for i = 1, #id_list do
        local id = id_list[i]
        if not ret_map[id] then
            tinsert(add_list, {
                player_id = player_id,
                id = id,
                count = 0,
            })
            ret_map[id] = 0
        end
    end

    if #add_list > 0 then
        g_ormobj:create_entry(add_list)
    end

    return ret_map
end

--批量增加道具
function handle.add_item_map(player_id, item_map)
    assert(player_id > 0, "err player_id " .. tostring(player_id))
    local id_list = {}
    for id, num in pairs(item_map) do
        assert(num >= 0, "err num ".. tostring(num))
        tinsert(id_list, id)
    end

    local entry_list = g_ormobj:get_entry_by_in(id_list, player_id)
    local ret_map = {}
    for i = 1, #entry_list do
        local entry = entry_list[i]
        local id = entry:get("id")
        local count = entry:get("count")
        count = count + item_map[id]
        entry:set("count", count)
        ret_map[id] = count
    end

    local add_list = {}
    for i = 1, #id_list do
        local id = id_list[i]
        if not ret_map[id] then
            tinsert(add_list, {
                player_id = player_id,
                id = id,
                count = item_map[id],
            })
            ret_map[id] = item_map[id]
        end
    end

    if #add_list > 0 then
        g_ormobj:create_entry(add_list)
    end

    return ret_map
end

M.handle = handle

return M