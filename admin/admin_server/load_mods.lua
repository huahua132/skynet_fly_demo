local redis_cfg = loadfile("../../commonlualib/common/etc/redis_cfg.lua")()
local mysql_cfg = loadfile("../../commonlualib/common/etc/mysql_cfg.lua")()
local server_cfg = loadfile("../../commonlualib/common/etc/server_cfg.lua")()
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
				rpc = redis_cfg.rpc,
			},

			--cluster_server用的配置
			cluster_server = cluster_server_cfg.admin.admin_server,

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
            file_path = './logs/',     --文件路径
            filename = 'server.log',   --文件名
            limit_size = 0,            --最小分割大小
            max_age = 7,               --最大保留天数
            max_backups = 7,           --最大保留文件数
            sys_cmd = [[
                /usr/bin/pkill -HUP -f skynet.admin_server_config.lua\n
            ]],              --系统命令
        }
    },
    --mysql连接
    mysql_m = {
		launch_seq = 5000,
		launch_num = 6, --启动6个
        default_arg = {
            db_conf = mysql_cfg.admin,
			is_create = true,				--数据库不存在就创建
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
    cluster_client_m = {
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
            }
        }
    },
}