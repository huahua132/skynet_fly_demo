local share_data = require "skynet-fly.sharedata"
local skynet = require "skynet"

local assert = assert
local pairs = pairs
local table = table

local g_item_info 

local function init()
    g_item_info = share_data:new("./data_tables/item_info.lua", share_data.enum.sharedata)
    :set_map("item_idx", "item_id")
    :builder()
end

skynet.init(init)

local M = {}

function M.hotfix()
    init()
end

--获取道具配置
function M.get_item_info(item_id)
    local item_idx_map = g_item_info:get_map("item_idx")
    local cfg = item_idx_map[item_id]
    assert(cfg, "item_id not exists cfg " .. item_id)

    return cfg
end

--获取道具列表
function M.get_item_list()
    local data_table = g_item_info:get_data_table()
    local list = {}
    for _,item in pairs(data_table) do
        table.insert(list, {
            item_id = item.item_id,
            item_name = item.item_name,
        })
    end
    return list
end

return M