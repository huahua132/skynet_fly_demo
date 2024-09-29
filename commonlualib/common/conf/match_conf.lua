local skynet = require "skynet"
local sharedata = require "skynet-fly.sharedata"
local log = require "skynet-fly.log"

local assert = assert
local pairs = pairs
local tinsert = table.insert

local g_match_game = nil

local function init()
    g_match_game = sharedata:new("./data_tables/match_game.lua", sharedata.enum.sharedata)
    :set_map("idx", "game_type", "play_type")
    :builder()
end

skynet.init(init)

local M = {}

function M.hotfix()
    init()
end

--获取指定玩法配置 
function M.get_cfg(game_type, play_type)
    local idx_map = g_match_game:get_map("idx")
    --log.info("get_cfg:", game_type, play_type, idx_map)
    if not idx_map[game_type] or not idx_map[game_type][play_type] then
        return nil
    end

    return idx_map[game_type][play_type]
end

--获取指定游戏的玩法列表
function M.get_play_type_list(game_type)

    local list = {}
    local idx_map = g_match_game:get_map("idx")
    
    local map = idx_map[game_type]
    if not map then
        return list
    end

    for play_type, cfg in pairs(map) do
        tinsert(list, play_type)
    end

    return list
end

return M