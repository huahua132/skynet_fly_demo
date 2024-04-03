local redis_cfg = loadfile("../../commonlualib/common/etc/redis_cfg.lua")()
local server_cfg = loadfile("../../commonlualib/common/etc/server_cfg.lua")()
local gate_cfg = loadfile("../../commonlualib/common/etc/gate_cfg.lua")()
local cluster_server_cfg = loadfile("../../commonlualib/common/etc/cluster_server_cfg.lua")()

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
				gateconf = gate_cfg.games.chinese_chess_1,
				login_plug = "common.plug.login_plug",  --login加载的插件lua模块文件名
			},

			redis = {
				--rpc连接配置
				rpc = redis_cfg.rpc,
				--全服共用的redis
				global = redis_cfg.global,
			},

			--cluster_server用的配置
			cluster_server = cluster_server_cfg.games.chinese_chess_1,

			server_cfg = server_cfg.games.chinese_chess_1,
		}
	},

	--大厅服
	room_game_hall_m = {
		launch_seq = 2, --第二个启动
		launch_num = 6, --启动6个
		default_arg = {
			hall_plug = "common.plug.hall_plug",         --大厅加载的插件lua模块文件名
		}
	},

	--匹配服
	room_game_alloc_m = {
		launch_seq = 3, --第三个启动
		launch_num = 1, --启动1个
		default_arg = {
			alloc_plug = "alloc.alloc_plug",       --匹配加载的插件lua模块文件名
			MAX_TABLES = 10000,  --最多1万个游戏桌子
		}
	},

	--房间服
	room_game_table_m = {
		launch_seq = 4, --第四个启动
		launch_num = 6, --启动6个
		default_arg = {
			table_plug = "table.table_plug",   --房间插件
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
            file_path = './logs_1/',          --文件路径
            filename = 'server.log',   --文件名
            limit_size = 0,            --最小分割大小
            max_age = 7,               --最大保留天数
            max_backups = 7,           --最大保留文件数
            sys_cmd = [[
                /usr/bin/pkill -HUP -f skynet.chinese_chess_config.lua.load_mods_1.lua\n
            ]],              --系统命令
        }
    },

	--debug入口
	debug_console_m = {
		launch_seq = 6,
		launch_num = 1,
	},

	--集群客户端
	cluster_client_m = {
		launch_seq = 7,
		launch_num = 1,
		default_arg = {
			node_map = {
				['logserver'] = true,
				['hallserver'] = true,
			},
			watch = 'redis',  --监听redis的方式做服务发现
		}
	},

	--token
	token_m = {
		launch_seq = 8,
		launch_num = 1,
	}
}