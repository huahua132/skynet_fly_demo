-- 集群服务配置
local M = {}

--cluster_port 规范为服务类型拼接游戏id拼接 3 例如 09 .. 01 .. 3
M.games = {
    chinese_chess = {
        host = "127.0.0.1:9013",
        register = "redis",        --连接信息注册到redis
    }    
}

--后台配置 10开头
M.admin = {
    admin_server = {
        host = "127.0.0.1:10013",
        register = "redis",        --连接信息注册到redis
    }
}

--世界配置 11开头
M.world = {
    logserver = {
        host = "127.0.0.1:11013",
        register = "redis",        --连接信息注册到redis
    },

    centerserver = {
        host = "127.0.0.1:11023",
        register = "redis",        --连接信息注册到redis
    }
}
return M