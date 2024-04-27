--gate 配置 

local M = {}
--gate_port 规范为服务类型拼接自增id拼接 2 例如 09 .. 01 .. 2
--游戏服 09
M.games = {
    chinese_chess_1 = {
        address = '0.0.0.0',
        port = 9012,
        maxclient = 10000,
        host = '127.0.0.1:9012',
    },
    chinese_chess_2 = {
        address = '0.0.0.0',
        port = 9022,
        maxclient = 10000,
        host = '127.0.0.1:9022',
    },
    digitalbomb_1 = {
        address = '0.0.0.0',
        port = 9032,
        maxclient = 10000,
        host = '127.0.0.1:9032',
    },
    digitalbomb_2 = {
        address = '0.0.0.0',
        port = 9042,
        maxclient = 10000,
        host = '127.0.0.1:9042',
    },
}

--世界配置 11
M.world = {
    hallserver_1 = {
        address = '0.0.0.0',
        port = 11012,
        maxclient = 20000,
        host = '127.0.0.1:11012',
    },
    hallserver_2 = {
        address = '0.0.0.0',
        port = 11022,
        maxclient = 20000,
        host = '127.0.0.1:11022',
    },
}

return M