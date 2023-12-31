return {
    --共享配置
	share_config_m = {
		launch_seq = 1000,     --启动顺序，从小到大
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
				host = "127.0.0.1:9689",
				register = "redis",        --连接信息注册到redis
			},
		}
	},

    --web服务agent
	web_agent_m = {
		launch_seq = 2000,
		launch_num = 6,
		default_arg = {
			protocol = 'http',
			dispatch = 'app',
			keep_alive_time = 300,         --最长保活时间
			second_req_limit = 2000,       --1秒内请求数量限制
		}
	},
    --web服务master
	web_master_m = {
		launch_seq = 3000,
		launch_num = 1,
		default_arg = {
			protocol = 'http',
			port = 80,         --端口
			max_client = 2048, --最大连接数
			second_conn_limit = 2000, --相同ip 1秒内建立连接数限制
			keep_live_limit = 2000,  --相同ip 保持活跃数量限制
		}
	},
    --日志切割
    logrotate_m = {
        launch_seq = 4000,
        launch_num = 1,
        default_arg = {
            file_path = './logs',      --文件路径
            filename = 'server.log',   --文件名
            limit_size = 0,            --最小分割大小
            max_age = 7,               --最大保留天数
            max_backups = 7,           --最大保留文件数
            sys_cmd = [[
                /usr/bin/pkill -HUP -f skynet.server_config.lua\n
            ]],              --系统命令
        }
    },
    --mysql连接
    mysql_m = {
		launch_seq = 5000,
		launch_num = 6, --启动6个
        default_arg = {
            db_conf = {
                host = '127.0.0.1',
                port = '3306',
                max_packet_size = 1048576,
                user = 'root',
                password = '123456',
                database = 'admin',
            }
        }
	},

	-- orm
	orm_table_m = {
		launch_seq = 5500,
		launch_num = 2,
		mod_args = {
			{instance_name = "roles",orm_plug = "roles_entity"},
			{instance_name = "users",orm_plug = "users_entity"},
		}
	},

    --集群客户端
    cluster_client_m = {
		launch_seq = 6000,
		launch_num = 1,
		default_arg = {
			node_map = {
				['chinese_chess'] = true,   --连接象棋游戏节点
				['logserver'] = true,       --连接日志服务节点
			},
			watch = 'redis',  --监听redis的方式做服务发现
		}
	},

    --监控
    monitor_m = {
        launch_seq = 7000,
        launch_num = 1,
        default_arg = {
            node_list = {
                'chinese_chess',             --象棋游戏
				'logserver',                 --日志服务
            }
        }
    },
	--私钥
    signature_m = {
        launch_seq = 8000,
        launch_num = 1,
    },
}