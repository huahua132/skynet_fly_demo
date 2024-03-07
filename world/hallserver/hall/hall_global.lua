local M = {}

local g_hall_interface = nil
local g_hall_msg = nil

function M.set_hall_interface(interface)
    g_hall_interface = interface
end

function M.get_hall_interface()
    return g_hall_interface
end

function M.set_hall_msg(hall_msg)
    g_hall_msg = hall_msg
end

function M.get_hall_msg()
    return g_hall_msg
end

return M