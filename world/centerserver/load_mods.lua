local server_cfg = loadfile("../../commonlualib/common/etc/server_cfg.lua")()
local redis_cfg = loadfile("../../commonlualib/common/etc/redis_cfg.lua")()
local frpc_server_cfg = loadfile("../../commonlualib/common/etc/frpc_server_cfg.lua")()
local mysql_cfg = loadfile("../../commonlualib/common/etc/mysql_cfg.lua")()

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

            mysql = {
                [mysql_cfg.world.centerserver.database] = mysql_cfg.world.centerserver
            },

			--cluster_server用的配置
			frpc_server = frpc_server_cfg.world.centerserver,

			server_cfg = server_cfg.world.centerserver
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
            file_path = server_cfg.world.centerserver.logpath,          --文件路径
            filename = 'server.log',   --文件名
            limit_size = 0,            --最小分割大小
            max_age = 7,               --最大保留天数
            max_backups = 7,           --最大保留文件数
            sys_cmd = [[
                /usr/bin/pkill -HUP -f skynet.make/centerserver_config.lua\n
            ]],              --系统命令
        }
    },
    --集群客户端
    frpc_client_m = {
		launch_seq = 7000,
		launch_num = 1,
		default_arg = {
			node_map = {
				['hallserver'] = true,      --大厅服
			},
			watch = 'redis',  --监听redis的方式做服务发现
		}
	},

    -- orm
	orm_table_m = {
		launch_seq = 5000,
		launch_num = 12,
		mod_args = {
			{instance_name = "account_1",orm_plug  = "orm_entity.account_entity"},
            {instance_name = "account_2",orm_plug  = "orm_entity.account_entity"},
            {instance_name = "account_3",orm_plug  = "orm_entity.account_entity"},
            {instance_name = "account_4",orm_plug  = "orm_entity.account_entity"},
            {instance_name = "account_5",orm_plug  = "orm_entity.account_entity"},
            {instance_name = "account_6",orm_plug  = "orm_entity.account_entity"},
            {instance_name = "account_7",orm_plug  = "orm_entity.account_entity"},
            {instance_name = "account_8",orm_plug  = "orm_entity.account_entity"},
            {instance_name = "account_9",orm_plug  = "orm_entity.account_entity"},
            {instance_name = "account_10",orm_plug = "orm_entity.account_entity"},

            --自增id分配
            {instance_name = "allocid",   orm_plug = "orm_entity.allocid_entity"},
            --全服邮件
            {instance_name = "global_email", orm_plug = "orm_entity.global_email_entity"},
		}
	},

    account_m = {
        launch_seq = 6000,
        launch_num = 10,
    },

    global_email_m = {
        launch_seq = 7000,
        launch_num = 1,
    }
}