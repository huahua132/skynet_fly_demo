
local item_logic = hotfix_require "hall.item.item_logic"

local M = {}

function M.init(interface_mgr)
    item_logic.init(interface_mgr)
end

function M.on_login(player_id)
    item_logic.on_login(player_id)
end

function M.on_loginout(player_id)
    item_logic.on_loginout(player_id)
end

function M.on_reconnect(player_id)
    item_logic.on_reconnect(player_id)
end

M.handle = {

}

local CMD = {}
--查询道具
function CMD.item_get_item(player_id, id)
    return item_logic.cmd_get_item(player_id, id)
end
--增加道具
function CMD.item_add_item(player_id, id, num)
    return item_logic.cmd_add_item(player_id, id, num)
end
--扣除道具
function CMD.item_reduce_item(player_id, id, num)
    return item_logic.cmd_reduce_item(player_id, id, num)
end

M.register_cmd = CMD

return M