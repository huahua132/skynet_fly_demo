local log = require "skynet-fly.log"
local time_util = require "skynet-fly.utils.time_util"
local item_msg = require "msg.item_msg"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local state_data = require "skynet-fly.hotfix.state_data"
local event_mgr = require "common.event_mgr"
local EVENT_ID = require "enum.EVENT_ID"
local interface = require "hall.item.interface"
local table_util = require "skynet-fly.utils.table_util"
local item_conf = hotfix_require "common.conf.item_conf"

local assert = assert
local tinsert = table.insert
local pairs = pairs
local next = next

local g_item_entity = orm_table_client:instance("item")

local g_local_info = state_data.alloc_table("g_local_info")

local M = {}
function M.init(interface_mgr)
    g_local_info.item_msg = item_msg:new(interface_mgr)
end
---------------------------其他逻辑------------------------------------
local function player_item_notice(player_id)
    local item_list = g_item_entity:get_entry(player_id)
    g_local_info.item_msg:item_list_notice(player_id, {
        item_list = item_list,
    })
end
---------------------------客户端事件----------------------------------
--登录
function M.on_login(player_id)
    player_item_notice(player_id)
end

--登出
function M.on_loginout(player_id)

end

--重连
function M.on_reconnect(player_id)
    player_item_notice(player_id)
end

---------------------------客户端消息处理-------------------------------


---------------------------CMD-----------------------------------------
--查询道具
function M.cmd_get_item(player_id, id)
    local item_cfg = item_conf.get_item_info(id)
    assert(item_cfg, "not item_cfg " .. id)
    return g_item_entity:get_item(player_id, id)
end

--增加道具
function M.cmd_add_item(player_id, id, num)
    local item_cfg = item_conf.get_item_info(id)
    assert(item_cfg, "not item_cfg " .. id)
    local count = g_item_entity:add_item(player_id, id, num)
    if not count then
        return nil
    end

    --同步到客户端
    g_local_info.item_msg:item_list_notice(player_id, {
        item_list = {{id = id, count = count}}
    })

    event_mgr.publish(EVENT_ID.ITEM_CHANGE, player_id, id, num, count)
    return count
end

--减少道具
function M.cmd_reduce_item(player_id, id, num)
    local item_cfg = item_conf.get_item_info(id)
    assert(item_cfg, "not item_cfg " .. id)
    local ret,count = g_item_entity:reduce_item(player_id, id, num)
    if not ret then
        return ret,count
    end

    --同步到客户端
    g_local_info.item_msg:item_list_notice(player_id, {
        item_list = {{id = id, count = count}}
    })
    event_mgr.publish(EVENT_ID.ITEM_CHANGE, player_id, id, -num, count)

    return ret,count
end

--批量查询道具
function M.cmd_get_item_map(player_id, id_list)
    return g_item_entity:get_item_map(player_id, id_list)
end

--批量增加道具
function M.cmd_add_item_map(player_id, item_map)
    if not next(item_map) then return item_map end
    for id, count in pairs(item_map) do
        local item_cfg = item_conf.get_item_info(id)
        assert(item_cfg, "not item_cfg " .. id)
        assert(count >= 0, "count err " .. count)
    end

    local ret_map = g_item_entity:add_item_map(player_id, item_map)
    local item_list = {}
    for id, count in table_util.sort_ipairs_byk(ret_map) do
        tinsert(item_list, {id = id, count = count})
        local num = item_map[id]
        event_mgr.publish(EVENT_ID.ITEM_CHANGE, player_id, id, num, count)
    end
    g_local_info.item_msg:item_list_notice(player_id, {item_list = item_list})

    return ret_map
end

--批量增加道具
function M.cmd_add_item_list(player_id, item_list)
    if not next(item_list) then return item_list end
    
    local item_map = {}
    for i = 1, #item_list do
        local one_item = item_list[i]
        local id = one_item.id
        local count = one_item.count
        local item_cfg = item_conf.get_item_info(id)
        assert(item_cfg, "not item_cfg " .. id)
        assert(count >= 0, "count err " .. count)
        if not item_map[id] then
            item_map[id] = {}
        end
        item_map[id] = item_map[id] + count
    end

    local ret_map = g_item_entity:add_item_map(player_id, item_map)
    local item_list = {}
    for id, count in table_util.sort_ipairs_byk(ret_map) do
        tinsert(item_list, {id = id, count = count})
        local num = item_map[id]
        event_mgr.publish(EVENT_ID.ITEM_CHANGE, player_id, id, num, count)
    end
    g_local_info.item_msg:item_list_notice(player_id, {item_list = item_list})

    return ret_map
end

-----------------------------interface------------------------------------
--查询道具
function interface.get_item(player_id, id)
    return M.cmd_get_item(player_id, id)
end

--增加道具
function interface.add_item(player_id, id, num)
    return M.cmd_add_item(player_id, id, num)
end

--减少道具
function interface.reduce_item(player_id, id, num)
    return M.cmd_reduce_item(player_id, id, num)
end

--批量增加道具
function interface.add_item_map(player_id, item_map)
    return M.cmd_add_item_map(player_id, item_map)
end

--批量增加道具
function interface.add_item_list(player_id, item_list)
    return M.cmd_add_item_list(player_id, item_list)
end

return M