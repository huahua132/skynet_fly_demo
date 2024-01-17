return {
        --共享配置
	share_config_m = {
		launch_seq = 1,     --启动顺序，从小到大
		launch_num = 1,     --启动数量
		default_arg = {     --默认配置
			redis = {
				--rpc连接配置
				rpc = {
					host = '127.0.0.1',
					port = 6379,
					auth = '123456',
					db = 0,
				},
			},

			--cluster_server用的配置
			cluster_server = {
				host = "127.0.0.1:9901",
				register = "redis",        --连接信息注册到redis
			},

			server_cfg = {
				debug_port = 9001,
			}
		}
	},
    	--debug入口
	debug_console_m = {
		launch_seq = 2,
		launch_num = 1,
	},
    	--日志切割
	logrotate_m = {
        launch_seq = 3,
        launch_num = 1,
        default_arg = {
            file_path = './logs/',          --文件路径
            filename = 'server.log',   --文件名
            limit_size = 0,            --最小分割大小
            max_age = 7,               --最大保留天数
            max_backups = 7,           --最大保留文件数
            sys_cmd = [[
                /usr/bin/pkill -HUP -f skynet.logserver_config.lua\n
            ]],              --系统命令
        }
    },

    warn_m = {
        launch_seq = 4,
        launch_num = 1,
    }
}