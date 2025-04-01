local server_cfg = loadfile("../../commonlualib/common/etc/server_cfg.lua")()
local http_cfg = loadfile("../../commonlualib/common/etc/http_cfg.lua")()

return {
    --共享配置
	share_config_m = {
		launch_seq = 1000,     --启动顺序，从小到大
		launch_num = 1,     --启动数量
		default_arg = {     --默认配置
			server_cfg = server_cfg.admin.game_client_server,
		}
	},

    --web服务agent
	web_agent_m = {
		launch_seq = 2000,
		launch_num = 6,
		default_arg = http_cfg.admin.game_client_server.agent
	},
    --web服务master
	web_master_m = {
		launch_seq = 3000,
		launch_num = 1,
		default_arg = http_cfg.admin.game_client_server.master
	},
    --日志切割
    logrotate_m = {
        launch_seq = 1,
        launch_num = 1,
        default_arg = {
            file_path = server_cfg.admin.game_client_server.logpath,     --文件路径
            filename = 'server.log',   --文件名
            limit_size = 0,            --最小分割大小
            max_age = 7,               --最大保留天数
            max_backups = 7,           --最大保留文件数
            sys_cmd = [[
                /usr/bin/pkill -HUP -f skynet.make/game_client_server_config.lua\n
            ]],              --系统命令
        }
    },
}