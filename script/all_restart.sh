#!/bin/bash

$skynet_fly_path = "../../skynet_fly/"

cd world/logserver
bash ${skynet_fly_path}binshell/make_server.sh ${skynet_fly_path}
bash script/restart.sh load_mods.lua
cd ../../

cd games/chinese_chess
bash ${skynet_fly_path}binshell/make_server.sh ${skynet_fly_path}
bash script/restart.sh load_mods.lua
cd ../../

cd games/stone_scissors_cloth
bash ${skynet_fly_path}binshell/make_server.sh ${skynet_fly_path}
bash script/restart.sh load_mods.lua
cd ../../

cd admin/admin_server
bash ${skynet_fly_path}binshell/make_server.sh ${skynet_fly_path}
bash script/restart.sh load_mods.lua
cd ../../