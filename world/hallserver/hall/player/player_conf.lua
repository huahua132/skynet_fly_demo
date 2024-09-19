local share_data = require "skynet-fly.sharedata"

local assert = assert

local g_player_level = share_data:new("./data_tables/player_level.lua", share_data.enum.sharedata)
                       :set_map("level_idx", "level")
                       :builder()

local M = {}

--获取等级需要经验值
function M.get_level_exp(level)
    local level_idx_map = g_player_level:get_map("level_idx")
    local cfg = level_idx_map[level]
    assert(cfg, "level not exists cfg " .. level)

    return cfg.exp
end

return M