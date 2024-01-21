local server_cfg = loadfile("../../common/etc/server_cfg.lua")()
local redis_cfg = loadfile("../../common/etc/redis_cfg.lua")()
local cluster_server_cfg = loadfile("../../common/etc/cluster_server_cfg.lua")()

return {
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
			cluster_server = cluster_server_cfg.world.logserver,

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
    }
}