local event_mgr = require "common.event_mgr"
local EVENT_ID = require "enum.EVENT_ID"
local log = require "skynet-fly.log"
local orm_table_client = require "skynet-fly.client.orm_table_client"

local g_game_record_cli = orm_table_client:new("game_record_entity")

local M = {}

function M.init()
    event_mgr.monitor(EVENT_ID.CROSS_DAY, function(player_id)
        g_game_record_cli:check_delete(player_id)
    end)
end

return M