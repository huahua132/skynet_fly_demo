local server_cfg = loadfile("../../commonlualib/common/etc/server_cfg.lua")()
local redis_cfg = loadfile("../../commonlualib/common/etc/redis_cfg.lua")()
local frpc_server_cfg = loadfile("../../commonlualib/common/etc/frpc_server_cfg.lua")()

return {
        --共享配置
	share_config_m = {
		launch_seq = 1,     --启动顺序，从小到大
		launch_num = 1,     --启动数量
		default_arg = {     --默认配置
			redis = {
				--rpc连接配置
				rpc = redis_cfg.rpc,

                --全服共用的redis
                global = redis_cfg.global,
			},

			--cluster_server用的配置
			frpc_server = frpc_server_cfg.world.matchserver,

			server_cfg = server_cfg.world.matchserver
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
            file_path = server_cfg.world.matchserver.logpath,          --文件路径
            filename = 'server.log',   --文件名
            limit_size = 0,            --最小分割大小
            max_age = 7,               --最大保留天数
            max_backups = 7,           --最大保留文件数
            sys_cmd = [[
                /usr/bin/pkill -HUP -f skynet.make/matchserver_config.lua\n
            ]],              --系统命令
        }
    },

    --集群客户端
    frpc_client_m = {
        launch_seq = 4,
        launch_num = 1,
        default_arg = {
            node_map = {
                ['hallserver'] = true,       --大厅服
                ['chinese_chess'] = true,    --中国象棋
                ['centerserver'] = true,     --中心服
                ['digitalbomb'] = true,      --数字炸弹
            },
            watch = 'redis',  --监听redis的方式做服务发现
        }
    },

    --匹配逻辑
    match_m = {
        launch_seq = 5,
        launch_num = 2,
        mod_args = {
            {instance_name = "chinese_chess"},
            {instance_name = "digitalbomb"},
        }
    },

    --好友推荐
    friend_sug_m = {
        launch_seq = 1,
        launch_num = 1,
    }
}