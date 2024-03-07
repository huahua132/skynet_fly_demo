local log = require "skynet-fly.log"
local GAME_ID_ENUM = require "common.enum.GAME_ID_ENUM"

local M = {}
 
function M.do_match_game(player_id, packname, pack_body)
    log.info("do_match_game >>> ",player_id, packname, pack_body)
    local game_id = pack_body.game_id
    local game_server = GAME_ID_ENUM[game_id]
    if not game_server then
        log.error("do_match_game not exists gameid ", game_id)
        return nil
    end
end

return M