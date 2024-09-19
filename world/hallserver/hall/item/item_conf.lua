local share_data = require "skynet-fly.sharedata"

local assert = assert

local g_item_info = share_data:new("./data_tables/item_info.lua", share_data.enum.sharedata)
                    :set_map("item_idx", "item_id")
                    :builder()

local M = {}

--获取道具配置
function M.get_item_info(item_id)
    local item_idx_map = g_item_info:get_map("item_idx")
    local cfg = item_idx_map[item_id]
    assert(cfg, "item_id not exists cfg " .. item_id)

    return cfg
end

return M