
local player_logic = hotfix_require "gamecommon.hall.player.player_logic"
local skynet = require "skynet"

local PACK = require "common.pack_helper".PACK

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

M.handle = {
    --心跳
    [PACK.login.HeartReq] = function(player_id, pack_id, pack_body)
       return player_logic.do_heart(player_id, pack_body)
    end,
}

local CMD = {}

--获取所有在线玩家ID
function CMD.get_all_online()
    return player_logic.cmd_get_all_online()
end

M.register_cmd = CMD

return M