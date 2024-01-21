--gate 配置 

local M = {}
--gate_port 规范为服务类型拼接游戏id拼接 2 例如 09 .. 01 .. 2
--游戏服 90
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

return M