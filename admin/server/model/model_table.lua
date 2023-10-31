local skynet = require "skynet"
local log = require "log"

local M = {}

function M.generate_items()
    local status_list = {'published', 'draft', 'deleted'}
    local items = {}
    local cnt = math.random(10,30)
    for i=1,cnt do
        local r = math.random(1,3)
        local t = math.floor(skynet.time()) + math.random(1, 1000)
        items[i] = {
            id = i,
            title = "title-" .. i,
            status = status_list[r],
            author = 'name-' .. i,
            display_time = os.date("%Y-%m-%d %H:%M:%S", t),
            pageviews = math.random(300, 5000),
        }
        log.debug("generate_items. i:", i, ", item:", items[i])
    end
    return items
end

return M
