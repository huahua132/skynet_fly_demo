local item_info = require "lua.item_info"

local interface = {}

function interface.check_rewards(reward_map)
    for id, count in pairs(reward_map) do
        assert(item_info[id], "item not exists:" .. id)
        assert(count > 0, "count need large 0 id = " .. id)
    end
end

INTERFACE.item = interface

return {
    export = {"item_info"},
    check_func = function()
        
    end
}