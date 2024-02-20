local table_util = dofile("../../skynet_fly/lualib/utils/table_util.lua")
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

M.world = {
    centerserver = table_util.deep_copy(db1),
    hallserver_1 = table_util.deep_copy(db1),
    hallserver_2 = table_util.deep_copy(db1),
}
M.world.centerserver.database = 'center'

M.world.hallserver_1.database = 'hall_1'
M.world.hallserver_2.database = 'hall_2'

return M