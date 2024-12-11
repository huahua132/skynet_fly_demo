local skynet = require "skynet"
local sharedata = require "skynet-fly.sharedata"
local log = require "skynet-fly.log"

local g_chess_type

local g_chess_rank

local g_chess_param

local function init()
    g_chess_type = sharedata:new("./data_tables/chess_type.lua", sharedata.enum.sharedata)
    :set_map("type_idx", "play_type")
    :builder()
    
    g_chess_rank = sharedata:new("./data_tables/chess_rank.lua", sharedata.enum.sharedata)
    :set_map("idx", "rank_id")
    :builder()
    
    g_chess_param = sharedata:new("./data_tables/chess_param.lua", sharedata.enum.sharedata):builder()
end

skynet.init(init)

local M = {}

--获取玩法配置
function M.get_type_cfg(play_type)
    local type_idx_map = g_chess_type:get_map("type_idx")
    return type_idx_map[play_type]
end

--获取段位等级
function M.get_rank_level(score)
    local data_tables = g_chess_rank:get_data_table()

    local index_cfg = data_tables[1]
    for i = 1, #data_tables do
        local cfg = data_tables[i]
        if cfg.need_score > score then
            break
        end

        index_cfg = cfg
    end

    if not index_cfg then
        log.error("can`t find rank level ", score)
        return 0
    end

    return index_cfg.level
end

--获取通用参数表
function M.get_params()
    return g_chess_param:get_data_table()
end

return M