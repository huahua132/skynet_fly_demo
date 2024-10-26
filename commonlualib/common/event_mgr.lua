--事件管理员
local log = require "skynet-fly.log"

local tinsert = table.insert
local assert = assert
local type = type
local debug_getinfo = debug.getinfo
local x_pcall = x_pcall

local M = {}

local g_event_cbs_map = {}
local g_event_cbs_name_list = {}

--监听事件
function M.monitor(event_id, callback)
    assert(event_id, "not event_id")
    assert(type(callback) == 'function')

    local info = debug_getinfo(2,"S")
    local name = info.short_src
    if not g_event_cbs_map[event_id] then
        g_event_cbs_map[event_id] = {}
        g_event_cbs_name_list[event_id] = {}
    end
    if not g_event_cbs_map[event_id][name] then
        tinsert(g_event_cbs_name_list[event_id], name)
    end
    g_event_cbs_map[event_id][name] = callback
end

--触发事件
function M.publish(event_id, ...)
    local cbsname = g_event_cbs_name_list[event_id]
    if not cbsname then
        return
    end

    for i = 1, #cbsname do
        local name = cbsname[i]
        local callback = g_event_cbs_map[event_id][name]
        local isok,err = x_pcall(callback, ...)
        if not isok then
            log.error_fmt("publish excute err event_id[%s] name[%s] err[%s]", event_id, name, err)
        end
    end
end

return M