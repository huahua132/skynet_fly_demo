--所有服务的系统配置
local M = {}
--debug_port 规范为服务类型拼接游戏id拼接 1 例如 09 .. 01 .. 1
--游戏配置 09开头
M.games = {
    chinese_chess = {
        debug_port = 9011,
    },
    stone_scissors_cloth = {
        debug_port = 9021,
    },
}

--后台配置 10开头
M.admin = {
    admin_server = {
        debug_port = 10011,
    }
}

--世界配置 11开头
M.world = {
    logserver = {
        debug_port = 11011,
    },

    centerserver = {
        debug_port = 11021,
    },
}

return M