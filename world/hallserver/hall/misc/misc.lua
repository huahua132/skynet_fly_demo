
local misc_logic = hotfix_require "hall.misc.misc_logic"

local _ = require "common.pack_helper".PACK

local M = {}

function M.init(interface_mgr)
    misc_logic.init(interface_mgr)
end

function M.on_login(player_id, is_jump_join)
    misc_logic.on_login(player_id, is_jump_join)
end

function M.on_reconnect(player_id)
    misc_logic.on_reconnect(player_id)
end

function M.on_disconnect(player_id)
    misc_logic.on_disconnect(player_id)
end

function M.on_loginout(player_id, is_jump_exit)
    misc_logic.on_loginout(player_id, is_jump_exit)
end

M.handle = {
   
}

local CMD = {}

M.register_cmd = CMD

return M