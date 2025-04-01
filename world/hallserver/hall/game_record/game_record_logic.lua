local event_mgr = require "common.event_mgr"
local EVENT_ID = hotfix_require "enum.EVENT_ID"
local log = require "skynet-fly.log"
local errorcode = require "common.enum.errorcode"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local game_record_msg = hotfix_require "msg.game_record_msg"
local state_data = require "skynet-fly.hotfix.state_data"

local g_game_record_cli = orm_table_client:new("game_record")

local g_local_info = state_data.alloc_table("g_local_info")

local MAX_PAGE_COUNT = 100

local M = {}

event_mgr.monitor(EVENT_ID.CROSS_DAY, function(player_id)
    g_game_record_cli:check_delete(player_id)
end)

function M.init(interface_mgr)
    g_local_info.game_record_msg = game_record_msg:new(interface_mgr)
end

function M.on_login(player_id)
    -- for i = 1, 100 do
    --     g_game_record_cli:add_record(player_id, os.time() + i, "23:" .. i, 1, 1, 1, i)
    -- end
end
---------------------------客户端消息处理-------------------------------
function M.do_record_list_req(player_id, pack_body)
    local pageage_num = pack_body.pageage_num or 0
    local pageage_count = pack_body.pageage_count or 0
    if pageage_num <= 0 then
        return nil, errorcode.REQ_PARAM_ERR, "pageage_num err " .. pageage_num
    end

    if pageage_count <= 0 or pageage_count > MAX_PAGE_COUNT then
        return nil, errorcode.REQ_PARAM_ERR, "pageage_count err " .. pageage_count
    end

    local cursor = pack_body.cursor
    local limit = pageage_count
    local sort = -1                    --降序排列
    local next_cursor, res_list, count = g_game_record_cli:get_entry_by_limit(cursor, limit, sort, player_id)

    local res = {
        pageage_num = pageage_num,
        pageage_count = pageage_count,
        total_count = count,
        record_list = res_list,
        next_cursor = next_cursor
    }

    return res  --回复给客户端的结果 RecordListRes
end

return M