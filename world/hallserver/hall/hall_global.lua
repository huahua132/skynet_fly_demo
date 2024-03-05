local M = {}

local g_hall_interface = nil

function M.set_hall_interface(interface)
    g_hall_interface = interface
end

function M.get_hall_interface()
    return g_hall_interface
end

return M