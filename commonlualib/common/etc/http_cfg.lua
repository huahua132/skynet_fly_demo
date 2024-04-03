-- http服务配置

local M = {}
--http_port 规范为服务类型拼接自增id拼接 1 例如 09 .. 01 .. 4
--后台配置 10开头
M.admin = {
    admin_server = {
        agent = {
			protocol = 'http',
			dispatch = 'app',			   --APP入口 app.lua
			keep_alive_time = 300,         --最长保活时间
			second_req_limit = 2000,       --1秒内请求数量限制
        },
        master = {
			protocol = 'http',
			port = 80,         --端口
			max_client = 2048, --最大连接数
			second_conn_limit = 2000, --相同ip 1秒内建立连接数限制
			keep_live_limit = 2000,  --相同ip 保持活跃数量限制
        }
    }
}

--世界配置 11开头
M.world = {
    loginserver_1 = {
        agent = {
			protocol = 'http',
			dispatch = 'app',			   --APP入口 app.lua
			keep_alive_time = 300,         --最长保活时间
			second_req_limit = 2000,       --1秒内请求数量限制
        },
        master = {
			protocol = 'http',
			port = 11014,         --端口
			max_client = 1000, 		--最大连接数
			second_conn_limit = 100, 	--相同ip 1秒内建立连接数限制
			keep_live_limit = 1000,  	--相同ip 保持活跃数量限制
        }
    },
    loginserver_2 = {
        agent = {
			protocol = 'http',
			dispatch = 'app',			   --APP入口 app.lua
			keep_alive_time = 300,         --最长保活时间
			second_req_limit = 2000,       --1秒内请求数量限制
        },
        master = {
			protocol = 'http',
			port = 11024,         --端口
			max_client = 1000, --最大连接数
			second_conn_limit = 100, --相同ip 1秒内建立连接数限制
			keep_live_limit = 1000,  --相同ip 保持活跃数量限制
        }
    }
}

return M