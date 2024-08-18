
local game_record_logic = hotfix_require "hall.game_record.game_record_logic"

local PACK = require "common.pack_helper".PACK

local M = {}

function M.init(interface_mgr)
    game_record_logic.init(interface_mgr)
end

function M.on_login(player_id)
    game_record_logic.on_login(player_id)
end


M.handle = {
    [PACK.hallserver_game_record.RecordListReq] = function(player_id, pack_id, pack_body)
        return game_record_logic.do_record_list_req(player_id, pack_body)
    end
}

local CMD = {}

M.register_cmd = CMD

return M