return {
	--共享配置
	share_config_m = {
		launch_seq = 1,     --启动顺序，从小到大
		launch_num = 1,     --启动数量
		default_arg = {     --默认配置
			--room_game_login用的配置
			room_game_login = {
				gateservice = "gate", --gate 或者 wsgate
				--gate连接配置
				gateconf = {
					address = '127.0.0.1',
					port = 8001,
					maxclient = 2048,
				},
				login_plug = "login_plug",  --login加载的插件lua模块文件名
			},

			server_cfg = {
				debug_port = 8002,
			}
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

	--桌子分配服
	room_game_alloc_m = {
		launch_seq = 3, --第三个启动
		launch_num = 1, --启动1个
		default_arg = {
			alloc_plug = "alloc_plug",       --匹配加载的插件lua模块文件名
			MAX_TABLES = 10000,  --最多1万个游戏桌子
		}
	},

	--桌子服
	room_game_table_m = {
		launch_seq = 4, --第四个启动
		launch_num = 6, --启动6个
		default_arg = {
			table_plug = "table_plug",   --房间插件
			table_conf = {
				player_num = 2,        --2个人玩
			}
		}
	},

	--测试客户端
	client_m = {
		launch_seq = 5,    --第5个启动
		launch_num = 2,    --启动2个
		delay_run = true,
		mod_args = {
			{password = '123456',player_id = 10000}, --第一个服务的配置
			{password = '123456',player_id = 10001}, --第二个服务的配置
		}
	}
}