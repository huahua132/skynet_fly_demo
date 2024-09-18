local redis_cfg = loadfile("../../commonlualib/common/etc/redis_cfg.lua")()
local server_cfg = loadfile("../../commonlualib/common/etc/server_cfg.lua")()
local gate_cfg = loadfile("../../commonlualib/common/etc/gate_cfg.lua")()
local frpc_server_cfg = loadfile("../../commonlualib/common/etc/frpc_server_cfg.lua")()

return {
	--共享配置
	share_config_m = {
		launch_seq = 1000,     --启动顺序，从小到大
		launch_num = 1,     --启动数量
		default_arg = {     --默认配置
			--room_game_login用的配置
			room_game_login = {
				--gate连接配置
				wsgateconf = gate_cfg.games.digitalbomb_1,
				login_plug = "common.plug.login_plug",  --login加载的插件lua模块文件名
			},

			redis = {
				--rpc连接配置
				rpc = redis_cfg.rpc,
				--全服共用的redis
				global = redis_cfg.global,
			},

			--cluster_server用的配置
			frpc_server = frpc_server_cfg.games.digitalbomb_1,

			server_cfg = server_cfg.games.digitalbomb_1,
		}
	},
	
	--大厅服
	room_game_hall_m = {
		launch_seq = 2000, --第二个启动
		launch_num = 6, --启动6个
		default_arg = {
			hall_plug = "common.plug.hall_plug",         --大厅加载的插件lua模块文件名
			is_game = true,
		}
	},

	--匹配服
	room_game_alloc_m = {
		launch_seq = 3000, --第三个启动
		launch_num = 1, --启动1个
		default_arg = {
			alloc_plug = "common.plug.alloc_plug",       --匹配加载的插件lua模块文件名
			MAX_TABLES = 10000,  --最多1万个游戏桌子
			max_empty_time = 60,            --空置一分钟就解散
		}
	},

	--房间服
	room_game_table_m = {
		launch_seq = 4000, --第四个启动
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
        launch_seq = 5000,
        launch_num = 1,
        default_arg = {
            file_path = './logs_1/',          --文件路径
            filename = 'server.log',   --文件名
            limit_size = 0,            --最小分割大小
            max_age = 7,               --最大保留天数
            max_backups = 7,           --最大保留文件数
            sys_cmd = [[
                /usr/bin/pkill -HUP -f skynet.make/digitalbomb_config.lua.load_mods_1.lua\n
            ]],              --系统命令
        }
    },

	--debug入口
	debug_console_m = {
		launch_seq = 6000,
		launch_num = 1,
	},

	--集群客户端
	frpc_client_m = {
		launch_seq = 7000,
		launch_num = 1,
		default_arg = {
			node_map = {
				['hallserver'] = true,
			},
			watch = 'redis',  --监听redis的方式做服务发现
		}
	},

	--token
	token_m = {
		launch_seq = 8000,
		launch_num = 1,
	},
}