local error = error
local M = {}

--这是player对外的接口 这里写定义，player_logic写实现

--获取玩家列表
function M.get_online_list()
    error("调用了未实现的接口 get_online_list")
end

--获取玩家信息
function M.get_info(player_id)
    error("调用了未实现的接口 get_info")
end

--批量获取玩家信息
function M.get_players_info(player_list, filed_map)
    error("调用了未实现的接口 get_players_info")
end

return M