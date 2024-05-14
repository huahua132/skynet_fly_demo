-- 集群服务配置
local M = {}

local register = "redis"    --连接信息注册到redis
--cluster_port 规范为服务类型拼接自增id拼接 3 例如 09 .. 01 .. 3
M.games = {
    chinese_chess_1 = {
        host = "127.0.0.1:9013",
        register = register,
        --gate连接配置
        gateconf = {
            address = '127.0.0.1',
            port = 9013,
            maxclient = 2048,
        },        
    },
    chinese_chess_2 = {
        host = "127.0.0.1:9023",
        register = register,
        gateconf = {
            address = '127.0.0.1',
            port = 9023,
            maxclient = 2048,
        },
    },
    digitalbomb_1 = {
        host = "127.0.0.1:9033",
        register = register,
        gateconf = {
            address = '127.0.0.1',
            port = 9033,
            maxclient = 2048,
        },
    },
    digitalbomb_2 = {
        host = "127.0.0.1:9043",
        register = register,
        gateconf = {
            address = '127.0.0.1',
            port = 9043,
            maxclient = 2048,
        },
    }
}

--后台配置 10开头
M.admin = {
    admin_server = {
        host = "127.0.0.1:10013",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '127.0.0.1',
            port = 10013,
            maxclient = 2048,
        },
    }
}

--世界配置 11开头
M.world = {
    centerserver = {
        host = "127.0.0.1:11013",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '127.0.0.1',
            port = 11013,
            maxclient = 2048,
        },
    },

    logserver = {
        host = "127.0.0.1:11023",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '127.0.0.1',
            port = 11023,
            maxclient = 2048,
        },
    },

    matchserver = {
        host = "127.0.0.1:11033",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '127.0.0.1',
            port = 11033,
            maxclient = 2048,
        },
    },

    loginserver_1 = {
        host = "127.0.0.1:11113",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '127.0.0.1',
            port = 11113,
            maxclient = 2048,
        },
    },
    loginserver_2 = {
        host = "127.0.0.1:11123",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '127.0.0.1',
            port = 11123,
            maxclient = 2048,
        },
    },

    hallserver_1 = {
        host = "127.0.0.1:11213",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '127.0.0.1',
            port = 11213,
            maxclient = 2048,
        },
    },
    hallserver_2 = {
        host = "127.0.0.1:11223",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '127.0.0.1',
            port = 11223,
            maxclient = 2048,
        },
    }
}

--机器人  12开头
M.robots = {
    chinese_chess_robot = {
        host = "127.0.0.1:12013",
        register = register,
        gateconf = {
            address = '127.0.0.1',
            port = 12013,
            maxclient = 2048,
        },        
    },
    digitalbomb_robot = {
        host = "127.0.0.1:12023",
        register = register,
        gateconf = {
            address = '127.0.0.1',
            port = 12023,
            maxclient = 2048,
        },
    }
}
return M