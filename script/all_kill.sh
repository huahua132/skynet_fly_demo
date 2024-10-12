#!/bin/bash

#关闭机器人
cd robots/digitalbomb_robot
bash make/script/stop.sh load_mods.lua
cd ../../

cd robots/chinese_chess_robot
bash make/script/stop.sh load_mods.lua
cd ../../

#关闭游戏
cd games/digitalbomb
bash make/script/stop.sh load_mods_1.lua
bash make/script/stop.sh load_mods_2.lua
cd ../../

cd games/chinese_chess
bash make/script/stop.sh load_mods_1.lua
bash make/script/stop.sh load_mods_2.lua
cd ../../

#关闭web游戏客户端服务
cd admin/game_client_server
bash make/script/stop.sh load_mods.lua
cd ../../

#关闭后台
cd admin/admin_server
bash make/script/stop.sh load_mods.lua
cd ../../

#关闭世界服相关
cd world/hallserver
bash make/script/stop.sh load_mods_1.lua
bash make/script/stop.sh load_mods_2.lua
cd ../../

cd world/loginserver
bash make/script/stop.sh load_mods_1.lua
bash make/script/stop.sh load_mods_2.lua
cd ../../

cd world/matchserver
bash make/script/stop.sh load_mods.lua
cd ../../

cd world/centerserver
bash make/script/stop.sh load_mods.lua
cd ../../

cd world/logserver
bash make/script/stop.sh load_mods.lua
cd ../../