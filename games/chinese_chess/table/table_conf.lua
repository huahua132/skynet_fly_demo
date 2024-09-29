local sharedata = require "skynet-fly.sharedata"

local g_chess_type = sharedata:new("./data_tables/chess_type.lua", sharedata.enum.sharedata)
                       :set_map("type_idx", "play_type")
                       :builder()


local M = {}

--获取玩法配置
function M.get_type_cfg(play_type)
    local type_idx_map = g_chess_type:get_map("type_idx")
    return type_idx_map[play_type]
end

return M