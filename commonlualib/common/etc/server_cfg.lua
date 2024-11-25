--所有服务的系统配置
local M = {}
--debug_port 规范为服务类型拼接自增id拼接 1 例如 09 .. 01 .. 1
--游戏配置 09开头
local RECORD_LIMIT = 1024 * 1024 * 100

M.games = {
    chinese_chess_1 = {
        svr_id = 1,         --服务ID
        thread = 8,         --工作线程数
        debug_port = 9011,  --调试端口
        logpath = '../../logs/chinese_chess_1',
    },
    chinese_chess_2 = {
        svr_id = 2,
        thread = 8,
        debug_port = 9021,
        logpath = '../../logs/chinese_chess_2',
    },
    digitalbomb_1 = {
        svr_id = 1,         --服务ID
        thread = 8,         --工作线程数
        debug_port = 9031,  --调试端口
        logpath = '../../logs/digitalbomb_1',
        loglevel = 'error',
    },
    digitalbomb_2 = {
        svr_id = 2,         --服务ID
        thread = 8,         --工作线程数
        debug_port = 9041,  --调试端口
        logpath = '../../logs/digitalbomb_2',
        loglevel = 'error',
    },
}

--后台配置 10开头
M.admin = {
    admin_server = {
        thread = 4,
        debug_port = 10011,
        logpath = '../../logs/admin_server',
    },
    game_client_server = {
        thread = 4,
        debug_port = 10021,
        logpath = '../../logs/game_client_server',
    },
}

--世界配置 11开头
M.world = {
    centerserver = {
        thread = 8,
        debug_port = 11011,
        logpath = '../../logs/centerserver',
        machine_id = 1,                         --机器人号，全局唯一，用于雪花算法guid生成
    },

    logserver = {
        thread = 2,
        debug_port = 11021,
        logpath = '../../logs/logserver',
    },

    matchserver = {
        thread = 4,
        debug_port = 11031,
        logpath = '../../logs/matchserver',
    },

    loginserver_1 = {
        thread = 4,
        svr_id = 1,
        logpath = '../../logs/loginserver_1',
        debug_port = 11111,
        loglevel = 'error',
    },
    loginserver_2 = {
        thread = 4,
        svr_id = 2,
        logpath = '../../logs/loginserver_2',
        debug_port = 11121,
        loglevel = 'error',
    },

    hallserver_1 = {
        thread = 8,
        svr_id = 1,
        logpath = '../../logs/hallserver_1',
        debug_port = 11211,
        recordlimit = RECORD_LIMIT,
        recordpath = '../../records/hallserver_1',
    },
    hallserver_2 = {
        thread = 8,
        svr_id = 2,
        logpath = '../../logs/hallserver_2',
        debug_port = 11221,
        recordlimit = RECORD_LIMIT,
        recordpath = '../../records/hallserver_2',
    },
}
--世界配置 12开头
M.robots = {
    chinese_chess_robot = {
        thread = 8,
        debug_port = 12011,
        logpath = '../../logs/chinese_chess_robot',
    },
    digitalbomb_robot = {
        thread = 8,
        debug_port = 12021,
        logpath = '../../logs/digitalbomb_robot',
    }
}

return M