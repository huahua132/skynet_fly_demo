
local player_logic = hotfix_require "hall.player.player_logic"
local skynet = require "skynet"


local M = {}

function M.init(interface_mgr)
    skynet.fork(function()
        while true do
            skynet.sleep(60 * 10 * 100) --10分钟检测一次
            player_logic.check_heart()
        end
    end)
    player_logic.init(interface_mgr)
end

function M.on_login(player_id)
    player_logic.on_login(player_id)
end

function M.on_loginout(player_id)
    player_logic.on_loginout(player_id)
end

function M.on_reconnect(player_id)
    player_logic.on_reconnect(player_id)
end

M.handle = {
    --心跳
    ['.hallserver_player.HeartReq'] = function(player_id, packname, pack_body)
       return player_logic.do_heart(player_id, pack_body)
    end,
}

local CMD = {}

--获取玩家信息
function CMD.player_get_info(player_id)
    return player_logic.cmd_get_info(player_id)
end

--获取所有在线玩家ID
function CMD.get_all_online()
    return player_logic.cmd_get_all_online()
end

--批量获取玩家字段信息
function CMD.player_get_players_info(player_list, field_list)
    return player_logic.cmd_get_players_info(player_list, field_list)
end

--批量获取本server下的玩家字段信息
function CMD.player_get_players_info_by_local(player_list, field_list)
    return player_logic.cmd_get_players_info_by_local(player_list, field_list)
end

M.register_cmd = CMD

return M