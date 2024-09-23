--事件管理员
local log = require "skynet-fly.log"

local tinsert = table.insert
local assert = assert
local type = type
local debug_getinfo = debug.getinfo
local pairs = pairs
local x_pcall = x_pcall

local M = {}

local g_event_cbs_map = {}

--监听事件
function M.monitor(event_id, callback)
    assert(event_id, "not event_id")
    assert(type(callback) == 'function')

    local info = debug_getinfo(2,"S")
    local name = info.short_src
    if not g_event_cbs_map[event_id] then
        g_event_cbs_map[event_id] = {}
    end

    g_event_cbs_map[event_id][name] = callback
end

--触发事件
function M.publish(event_id, ...)
    local cbs = g_event_cbs_map[event_id]
    if not cbs then
        return
    end

    for name, callback in pairs(cbs) do
        local isok,err = x_pcall(callback, ...)
        if not isok then
            log.error_fmt("publish excute err event_id[%s] name[%s] err[%s]", event_id, name, err)
        end
    end
end

return M