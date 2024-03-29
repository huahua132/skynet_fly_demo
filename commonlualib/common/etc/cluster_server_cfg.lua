-- 集群服务配置
local M = {}

local register = "redis"    --连接信息注册到redis
--cluster_port 规范为服务类型拼接游戏id拼接 3 例如 09 .. 01 .. 3
M.games = {
    chinese_chess = {
        host = "127.0.0.1:9013",
        register = register,        
    }    
}

--后台配置 10开头
M.admin = {
    admin_server = {
        host = "127.0.0.1:10013",
        register = register,        --连接信息注册到redis
    }
}

--世界配置 11开头
M.world = {
    centerserver = {
        host = "127.0.0.1:11013",
        register = register,        --连接信息注册到redis
    },

    logserver = {
        host = "127.0.0.1:11023",
        register = register,        --连接信息注册到redis
    },

    matchserver = {
        host = "127.0.0.1:11033",
        register = register,        --连接信息注册到redis
    },

    loginserver_1 = {
        host = "127.0.0.1:11113",
        register = register,        --连接信息注册到redis
    },
    loginserver_2 = {
        host = "127.0.0.1:11123",
        register = register,        --连接信息注册到redis
    },

    hallserver_1 = {
        host = "127.0.0.1:11213",
        register = register,        --连接信息注册到redis
    },
    hallserver_2 = {
        host = "127.0.0.1:11223",
        register = register,        --连接信息注册到redis
    }
}

--机器人  12开头
M.robots = {
    chinese_chess_robot = {
        host = "127.0.0.1:12013",
        register = register,        
    }
}
return M