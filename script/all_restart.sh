#!/bin/bash

skynet_fly_path="../../skynet_fly/"
bin_shell_path="${skynet_fly_path}/script/shell"
make_cmd="${bin_shell_path}/make_server.sh ${skynet_fly_path}"

ulimit -n 65535
ulimit -c unlimited

#启动世界相关服
cd world/logserver
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../

cd world/centerserver
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../

cd world/matchserver
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../

cd world/loginserver
bash ${make_cmd}
bash script/restart.sh load_mods_1.lua
bash script/restart.sh load_mods_2.lua
cd ../../

cd world/hallserver
bash ${make_cmd}
bash script/restart.sh load_mods_1.lua
bash script/restart.sh load_mods_2.lua
cd ../../

#启动后台
cd admin/admin_server
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../

#启动web游戏客户端服务
cd admin/game_client_server
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../

#启动游戏
cd games/chinese_chess
bash ${make_cmd}
bash script/restart.sh load_mods_1.lua
bash script/restart.sh load_mods_2.lua
cd ../../

cd games/digitalbomb
bash ${make_cmd}
bash script/restart.sh load_mods_1.lua
bash script/restart.sh load_mods_2.lua
cd ../../

#启动机器人
cd robots/chinese_chess_robot
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../

cd robots/digitalbomb_robot
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../