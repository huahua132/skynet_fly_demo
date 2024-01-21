--mysql的配置

local db1 = {
    host = '127.0.0.1',
    port = '3306',
    max_packet_size = 1048576,
    user = 'root',
    password = '123456',
    database = 'admin',
}

local M = {}

M.admin = db1

return M