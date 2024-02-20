--gate 配置 

local M = {}
--gate_port 规范为服务类型拼接游戏id拼接 2 例如 09 .. 01 .. 2
--游戏服 09
M.games = {
    chinese_chess = {
        address = '0.0.0.0',
        port = 9012,
        maxclient = 2048,
    },
    stone_scissors_cloth = {
        address = '0.0.0.0',
        port = 9112,
        maxclient = 2048,
    }
}

--世界配置 11
M.world = {
    hallserver_1 = {
        address = '0.0.0.0',
        port = 11012,
        maxclient = 6000,
        host = '127.0.0.1:11012',
    },
    hallserver_2 = {
        address = '0.0.0.0',
        port = 11022,
        maxclient = 6000,
        host = '127.0.0.1:11022',
    },
}

return M