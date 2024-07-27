
local game_record_logic = hotfix_require "hall.game_record.game_record_logic"
local skynet = require "skynet"


local M = {}

function M.init(interface_mgr)
    game_record_logic.init()
end

M.handle = {

}

local CMD = {}

M.register_cmd = CMD

return M