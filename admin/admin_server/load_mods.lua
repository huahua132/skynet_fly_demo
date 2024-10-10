local redis_cfg = loadfile("../../commonlualib/common/etc/redis_cfg.lua")()
local mysql_cfg = loadfile("../../commonlualib/common/etc/mysql_cfg.lua")()
local server_cfg = loadfile("../../commonlualib/common/etc/server_cfg.lua")()
local frpc_server_cfg = loadfile("../../commonlualib/common/etc/frpc_server_cfg.lua")()
local http_cfg = loadfile("../../commonlualib/common/etc/http_cfg.lua")()

return {
    --共享配置
	share_config_m = {
		launch_seq = 1000,     --启动顺序，从小到大
		launch_num = 1,     --启动数量
		default_arg = {     --默认配置
			redis = {
				--rpc连接配置
				rpc = redis_cfg.rpc,
				--全服共用的redis
				global = redis_cfg.global,
			},

			mysql = {
				[mysql_cfg.admin.database] = mysql_cfg.admin,
			},
			--cluster_server用的配置
			frpc_server = frpc_server_cfg.admin.admin_server,

			server_cfg = server_cfg.admin.admin_server,
		}
	},

	--私钥
	signature_m = {
		launch_seq = 1500,
		launch_num = 1,
	},

    --web服务agent
	web_agent_m = {
		launch_seq = 2000,
		launch_num = 6,
		default_arg = http_cfg.admin.admin_server.agent
	},
    --web服务master
	web_master_m = {
		launch_seq = 3000,
		launch_num = 1,
		default_arg = http_cfg.admin.admin_server.master
	},
    --日志切割
    logrotate_m = {
        launch_seq = 4000,
        launch_num = 1,
        default_arg = {
            file_path = server_cfg.admin.admin_server.logpath,     --文件路径
            filename = 'server.log',   --文件名
            limit_size = 0,            --最小分割大小
            max_age = 7,               --最大保留天数
            max_backups = 7,           --最大保留文件数
            sys_cmd = [[
                /usr/bin/pkill -HUP -f skynet.make/admin_server_config.lua\n
            ]],              --系统命令
        }
    },
	-- orm
	orm_table_m = {
		launch_seq = 5500,
		launch_num = 2,
		mod_args = {
			{instance_name = "roles",orm_plug = "orm_entity.roles_entity"},
			{instance_name = "users",orm_plug = "orm_entity.users_entity"},
		}
	},

    --集群客户端
    frpc_client_m = {
		launch_seq = 6000,
		launch_num = 1,
		default_arg = {
			node_map = {
				['logserver'] = true,       --连接日志服务节点
				['chinese_chess'] = true,   --连接象棋游戏节点
				['chinese_chess_robot'] = true, --象棋机器人
				['hallserver'] = true,          --大厅服
				['centerserver'] = true,        --中心服
				['loginserver'] = true,         --登录服
				['matchserver'] = true,         --匹配服
				['digitalbomb'] = true,			--数字炸弹
				['digitalbomb_robot'] = true,	--数字炸弹机器人
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
				'chinese_chess_robot',
				'hallserver',
				'centerserver',
				'loginserver',
				'matchserver',
				'digitalbomb',
				'digitalbomb_robot',
            }
        }
    },
	--监控在线
	monitor_online_m = {
		launch_seq = 8000,
		launch_num = 1,
		default_arg = {
			node_map = {
				['hallserver'] = {			 --大厅服
					online = true,		     --在线
					regiter = true,			 --注册
				},
				['chinese_chess'] = {		 --象棋游戏服
					online = true,		     --在线
				}
			}
		}
	},
}