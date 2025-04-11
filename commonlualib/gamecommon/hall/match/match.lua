
local match_logic = hotfix_require "gamecommon.hall.match.match_logic"

local PACK = require "common.pack_helper".PACK

local M = {}

function M.init(interface_mgr)
    match_logic.init(interface_mgr)
end

M.handle = {
    --匹配
    [PACK.game_hall.JoinReq] = function(player_id, pack_id, pack_body)
       return match_logic.do_join(player_id, pack_body)
    end,
}

--开关忽略
M.switch_ignores = {
    [PACK.game_hall.JoinReq] = true,
}

local CMD = {}

M.register_cmd = CMD

return M