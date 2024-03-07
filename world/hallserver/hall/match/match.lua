
local match_logic = require "hall.match.match_logic"


local M = {}



function M.init()

end

M.handle = {
    ['.hallserver_hall.MatchGameReq'] = function(player_id, packname, pack_body)
        match_logic.do_match_game(player_id, pack_body)
    end
}

M.register_cmd = {

}

return M