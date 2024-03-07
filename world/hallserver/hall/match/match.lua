
local match_logic = require "hall.match.match_logic"


local M = {}

function M.init(interface_mgr)

end

M.handle = {
    ['.hallserver_hall.MatchGameReq'] = function(player_id, packname, pack_body)
       return match_logic.do_match_game(player_id, pack_body)
    end,
    ['.hallserver_hall.CancelMatchGameReq'] = function(player_id, packname, pack_body)
        return match_logic.do_cancel_match_game(player_id, pack_body)
    end,
}

local CMD = {}

--匹配成功
function CMD.match_succ(player_id, session_id, game_id)
   return match_logic.do_match_succ(player_id, session_id, game_id)
end

M.register_cmd = CMD

return M