--所有服务的系统配置
local M = {}
--debug_port 规范为服务类型拼接游戏id拼接 1 例如 09 .. 01 .. 1
--游戏配置 09开头
M.games = {
    chinese_chess = {
        thread = 8,
        debug_port = 9011,
    }
}

--后台配置 10开头
M.admin = {
    admin_server = {
        thread = 4,
        debug_port = 10011,
    }
}

--世界配置 11开头
M.world = {
    centerserver = {
        thread = 8,
        debug_port = 11011,
    },

    logserver = {
        thread = 2,
        debug_port = 11021,
    },

    matchserver = {
        thread = 4,
        debug_port = 11031,
    },

    loginserver_1 = {
        thread = 4,
        svr_id = 1,
        logpath = './logs_1/',
        debug_port = 11111,
    },
    loginserver_2 = {
        thread = 4,
        svr_id = 2,
        logpath = './logs_2/',
        debug_port = 11121,
    },

    hallserver_1 = {
        thread = 8,
        svr_id = 1,
        logpath = './logs_1/',
        debug_port = 11211,
    },
    hallserver_2 = {
        thread = 8,
        svr_id = 2,
        logpath = './logs_2/',
        debug_port = 11221,
    },
}
--世界配置 12开头
M.robots = {
    chinese_chess = {
        thread = 8,
        debug_port = 12011,
    }
}

return M