local ws_pbnet_util = require "ws_pbnet_util"

local M = {}

function M.init(interface_mgr)

end

M.send = ws_pbnet_util.send
M.broadcast = ws_pbnet_util.broadcast

--游戏桌子创建者
function M.table_creator(table_id)
    return {
		--玩家进入桌子
        enter = function(player_id)
            
        end,
		--玩家离开桌子
		leave = function(player_id)
			
		end,
		--玩家掉线
		disconnect = function(player_id)
			
		end,
		--玩家重连
		reconnect = function(player_id)
			
		end,
		--消息分发处理
		handle = {}
    }
end

return M