
local match_logic = require "hall.match.match_logic"


local M = {}

function M.init(interface_mgr)
    match_logic.init(interface_mgr)
end

M.handle = {
    --匹配
    ['.chinese_chess_hall.JoinReq'] = function(player_id, packname, pack_body)
       return match_logic.do_join(player_id, pack_body)
    end,
}

local CMD = {}

M.register_cmd = CMD

return M