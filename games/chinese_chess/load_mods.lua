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

	--匹配服
	room_game_match_m = {
		launch_seq = 3, --第三个启动
		launch_num = 1, --启动1个
		default_arg = {
			match_plug = "match_plug",       --匹配加载的插件lua模块文件名
			MAX_TABLES = 10000,  --最多1万个游戏桌子
		}
	},

	--房间服
	room_game_room_m = {
		launch_seq = 4, --第四个启动
		launch_num = 6, --启动6个
		default_arg = {
			room_plug = "room_plug",   --房间插件
			room_conf = {
				player_num = 2,        --2个人玩
			}
		}
	},
}