local server_cfg = loadfile("../../commonlualib/common/etc/server_cfg.lua")()
local redis_cfg = loadfile("../../commonlualib/common/etc/redis_cfg.lua")()
local frpc_server_cfg = loadfile("../../commonlualib/common/etc/frpc_server_cfg.lua")()

local cfg = {
        --共享配置
	share_config_m = {
		launch_seq = 1,     --启动顺序，从小到大
		launch_num = 1,     --启动数量
		default_arg = {     --默认配置
			redis = {
				--rpc连接配置
				rpc = redis_cfg.rpc
			},

			--cluster_server用的配置
			frpc_server = frpc_server_cfg.world.logserver,

			server_cfg = server_cfg.world.logserver
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
    },

	--集群客户端
    frpc_client_m = {
		launch_seq = 5,
		launch_num = 1,
		default_arg = {
			node_map = {
				['centerserver'] = true,    --中心服
				['hallserver'] = true,      --大厅服
                ['loginserver'] = true,     --日志服
				['matchserver'] = true,		--匹配服
				['admin_server'] = true,    --后台服

				--游戏服
				['chinese_chess'] = true,   --中国象棋
				['digitalbomb'] = true,     --数字炸弹

				--游戏机器人
				['chinese_chess_robot'] = true, --象棋机器人
				['digitalbomb_robot'] = true,   --数字炸弹机器人
			},
			watch = 'redis',  --监听redis的方式做服务发现
		}
	},
}

cfg.warn_m.default_arg = cfg.frpc_client_m.default_arg

return cfg