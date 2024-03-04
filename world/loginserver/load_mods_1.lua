local server_cfg = loadfile("../../commonlualib/common/etc/server_cfg.lua")()
local redis_cfg = loadfile("../../commonlualib/common/etc/redis_cfg.lua")()
local cluster_server_cfg = loadfile("../../commonlualib/common/etc/cluster_server_cfg.lua")()
local http_cfg = loadfile("../../commonlualib/common/etc/http_cfg.lua")()

return {
        --共享配置
	share_config_m = {
		launch_seq = 1000,     --启动顺序，从小到大
		launch_num = 1,     --启动数量
		default_arg = {     --默认配置
			redis = {
				--rpc连接配置
				rpc = redis_cfg.rpc
			},

			--cluster_server用的配置
			cluster_server = cluster_server_cfg.world.loginserver_1,

			server_cfg = server_cfg.world.loginserver_1
		}
	},

	 --web服务agent
	web_agent_m = {
		launch_seq = 2000,
		launch_num = 6,
		default_arg = http_cfg.world.loginserver_1.agent
	},
    --web服务master
	web_master_m = {
		launch_seq = 3000,
		launch_num = 1,
		default_arg = http_cfg.world.loginserver_1.master
	},

    --debug入口
	debug_console_m = {
		launch_seq = 4000,
		launch_num = 1,
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
                /usr/bin/pkill -HUP -f skynet.loginserver_config.lua.load_mods_1.lua\n
            ]],              --系统命令
        }
    },

	--集群客户端
    cluster_client_m = {
		launch_seq = 6000,
		launch_num = 1,
		default_arg = {
			node_map = {
				['centerserver'] = true,    --中心服
				['hallserver'] = true,      --大厅服
				['logserver'] = true,       --日志服
			},
			watch = 'redis',  --监听redis的方式做服务发现
		}
	},
}