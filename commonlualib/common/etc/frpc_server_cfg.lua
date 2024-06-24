-- 集群服务配置
local M = {}

local register = "redis"    --连接信息注册到redis
--cluster_port 规范为服务类型拼接自增id拼接 3 例如 09 .. 01 .. 3

local IP = '127.0.0.1'
M.games = {
    chinese_chess_1 = {
        host = IP .. ":9013",
        register = register,
        --gate连接配置
        gateconf = {
            address = '0.0.0.0',
            port = 9013,
            maxclient = 2048,
        },
        secret_key = "sadasfdsfgpdsjgsdogdfgdoigjs",
		is_encrypt = true,
    },
    chinese_chess_2 = {
        host = IP .. ":9023",
        register = register,
        gateconf = {
            address = '0.0.0.0',
            port = 9023,
            maxclient = 2048,
        },
    },
    digitalbomb_1 = {
        host = IP .. ":9033",
        register = register,
        gateconf = {
            address = '0.0.0.0',
            port = 9033,
            maxclient = 2048,
        },
        secret_key = "fdsgdfogihaoiehweiurgsddfj",
		is_encrypt = true,
    },
    digitalbomb_2 = {
        host = IP .. ":9043",
        register = register,
        gateconf = {
            address = '0.0.0.0',
            port = 9043,
            maxclient = 2048,
        },
    }
}

--后台配置 10开头
M.admin = {
    admin_server = {
        host = IP .. ":10013",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '0.0.0.0',
            port = 10013,
            maxclient = 2048,
        },
    }
}

--世界配置 11开头
M.world = {
    centerserver = {
        host = IP .. ":11013",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '0.0.0.0',
            port = 11013,
            maxclient = 2048,
        },
    },

    logserver = {
        host = IP .. ":11023",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '0.0.0.0',
            port = 11023,
            maxclient = 2048,
        },
    },

    matchserver = {
        host = IP .. ":11033",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '0.0.0.0',
            port = 11033,
            maxclient = 2048,
        },
    },

    loginserver_1 = {
        host = IP .. ":11113",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '0.0.0.0',
            port = 11113,
            maxclient = 2048,
        },
        secret_key = "sdfsdsdfsdhdhfgdsgfdsfs",
		is_encrypt = true,
    },
    loginserver_2 = {
        host = IP .. ":11123",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '0.0.0.0',
            port = 11123,
            maxclient = 2048,
        },
    },

    hallserver_1 = {
        host = IP .. ":11213",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '0.0.0.0',
            port = 11213,
            maxclient = 2048,
        },
        secret_key = "dfgdfhgfjhgjkghhfdgdfsd",
		is_encrypt = true,
    },
    hallserver_2 = {
        host = IP .. ":11223",
        register = register,        --连接信息注册到redis
        gateconf = {
            address = '0.0.0.0',
            port = 11223,
            maxclient = 2048,
        },
    }
}

--机器人  12开头
M.robots = {
    chinese_chess_robot = {
        host = IP .. ":12013",
        register = register,
        gateconf = {
            address = '0.0.0.0',
            port = 12013,
            maxclient = 2048,
        },        
    },
    digitalbomb_robot = {
        host = IP .. ":12023",
        register = register,
        gateconf = {
            address = '0.0.0.0',
            port = 12023,
            maxclient = 2048,
        },
    }
}
return M