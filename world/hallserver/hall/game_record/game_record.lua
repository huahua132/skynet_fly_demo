
local game_record_logic = require "hall.game_record.game_record_logic"
local skynet = require "skynet"


local M = {}

function M.init(interface_mgr)
    game_record_logic.init(interface_mgr)
end

M.handle = {

}

local CMD = {}

M.register_cmd = CMD

return M