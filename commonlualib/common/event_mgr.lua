--事件管理员

local tinsert = table.insert
local assert = assert
local type = type

local M = {}

local g_event_cbs_map = {}

--监听事件
function M.monitor(event_id, callback)
    assert(event_id, "not event_id")
    assert(type(callback) == 'function')
    if not g_event_cbs_map[event_id] then
        g_event_cbs_map[event_id] = {}
    end

    tinsert(g_event_cbs_map[event_id], callback)
end

--触发事件
function M.publish(event_id, ...)
    local cbs = g_event_cbs_map[event_id]
    if not cbs then
        return
    end

    local len = #cbs
    for i = 1, len do
        local cb = cbs[i]
        cb(...)
    end
end

return M