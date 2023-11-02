return {
	--共享配置
	share_config_m = {
		launch_seq = 1,     --启动顺序，从小到大
		launch_num = 1,     --启动数量
		default_arg = {     --默认配置
			--room_game_login用的配置
			room_game_login = {
				gateservice = "ws_gate", --gate 或者 ws_gate
				--gate连接配置
				gateconf = {
					address = '0.0.0.0',
					port = 8001,
					maxclient = 2048,
				},
				login_plug = "login_plug",  --login加载的插件lua模块文件名
			},

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
				host = "127.0.0.1:9688",
				register = "redis",        --连接信息注册到redis
			},
		}
	},

	--大厅服
	room_game_hall_m = {
		launch_seq = 2, --第二个启动
		launch_num = 6, --启动6个
		default_arg = {
			hall_plug = "hall_plug",         --大厅加载的插件lua模块文件名
		}
	},

	--匹配服
	room_game_alloc_m = {
		launch_seq = 3, --第三个启动
		launch_num = 1, --启动1个
		default_arg = {
			alloc_plug = "alloc_plug",       --匹配加载的插件lua模块文件名
			MAX_TABLES = 10000,  --最多1万个游戏桌子
		}
	},

	--房间服
	room_game_table_m = {
		launch_seq = 4, --第四个启动
		launch_num = 6, --启动6个
		default_arg = {
			table_plug = "table_plug",   --房间插件
			instance_name = "default",
			table_conf = {
				player_num = 2,        --2个人玩
			}
		}
	},

	--日志切割
	logrotate_m = {
        launch_seq = 5,
        launch_num = 1,
        default_arg = {
            file_path = './',          --文件路径
            filename = 'server.log',   --文件名
            limit_size = 0,            --最小分割大小
            max_age = 7,               --最大保留天数
            max_backups = 7,           --最大保留文件数
            sys_cmd = [[
                /usr/bin/pkill -HUP -f skynet.chinese_chess_config.lua\n
            ]],              --系统命令
        }
    },

	--debug入口
	debug_console_m = {
		launch_seq = 6,
		launch_num = 1,
	},
}