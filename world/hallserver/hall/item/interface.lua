local error = error
local M = {}

--这是item对外的接口 这里写定义，item_logic写实现

--获取道具数量
function M.get_item(player_id, id)
    error("调用了未实现的接口 get_item")
end

--增加道具
function M.add_item(player_id, id, num)
    error("调用了未实现的接口 add_item")
end

--减少道具
function M.reduce_item(player_id, id, num)
    error("调用了未实现的接口 reduce_item")
end

return M