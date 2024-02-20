local server_cfg = loadfile("../../common/etc/server_cfg.lua")()
local redis_cfg = loadfile("../../common/etc/redis_cfg.lua")()
local cluster_server_cfg = loadfile("../../common/etc/cluster_server_cfg.lua")()
local mysql_cfg = loadfile("../../common/etc/mysql_cfg.lua")()

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
			cluster_server = cluster_server_cfg.world.centerserver,

			server_cfg = server_cfg.world.centerserver
		}
	},
    --mysql连接
    mysql_m = {
        launch_seq = 2000,
        launch_num = 6, --启动6个
        default_arg = {
            db_conf = mysql_cfg.world.centerserver,
            is_create = true,				--数据库不存在就创建
        }
    },
    --debug入口
	debug_console_m = {
		launch_seq = 3000,
		launch_num = 1,
	},
    --日志切割
	logrotate_m = {
        launch_seq = 4000,
        launch_num = 1,
        default_arg = {
            file_path = './logs/',          --文件路径
            filename = 'server.log',   --文件名
            limit_size = 0,            --最小分割大小
            max_age = 7,               --最大保留天数
            max_backups = 7,           --最大保留文件数
            sys_cmd = [[
                /usr/bin/pkill -HUP -f skynet.centerserver_config.lua\n
            ]],              --系统命令
        }
    },

    -- orm
	orm_table_m = {
		launch_seq = 5000,
		launch_num = 10,
		mod_args = {
			{instance_name = "account_1",orm_plug  = "account_entity"},
            {instance_name = "account_2",orm_plug  = "account_entity"},
            {instance_name = "account_3",orm_plug  = "account_entity"},
            {instance_name = "account_4",orm_plug  = "account_entity"},
            {instance_name = "account_5",orm_plug  = "account_entity"},
            {instance_name = "account_6",orm_plug  = "account_entity"},
            {instance_name = "account_7",orm_plug  = "account_entity"},
            {instance_name = "account_8",orm_plug  = "account_entity"},
            {instance_name = "account_9",orm_plug  = "account_entity"},
            {instance_name = "account_10",orm_plug = "account_entity"},

            --自增id分配
            {instance_name = "allocid",   orm_plug = "allocid_entity"},
		}
	},

    account_m = {
        launch_seq = 6000,
        launch_num = 10,
    },

    --集群客户端
    cluster_client_m = {
		launch_seq = 7000,
		launch_num = 1,
		default_arg = {
			node_map = {
				['hallserver'] = true,      --大厅服
                ['logserver'] = true,       --日志服
			},
			watch = 'redis',  --监听redis的方式做服务发现
		}
	},
}