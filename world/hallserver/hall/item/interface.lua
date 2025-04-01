local error = error
local M = {}

--这是item对外的接口 这里写定义，item_logic写实现

--获取道具数量
function M.get_item(player_id, id)
    error("调用了未实现的接口 get_item")
end

--增加道具
function M.add_item(player_id, id, num, source)
    error("调用了未实现的接口 add_item")
end

--减少道具
function M.reduce_item(player_id, id, num, source)
    error("调用了未实现的接口 reduce_item")
end

--批量增加道具
--item_map : {[id1] = count, [id2] = count}
function M.add_item_map(player_id, item_map, source)
    error("调用了未实现的接口 add_item_map")
end

--批量增加道具 
-- item_list : {{id = 1, count = 100},{id = 2, count = 200}}
function M.add_item_list(player_id, item_list, source)
    error("调用了未实现的接口 add_item_list")
end

--道具转换
function M.convert_item_list(items)
    error("调用了未实现的接口 convert_item_list")
end

return M