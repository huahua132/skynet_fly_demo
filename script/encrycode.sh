#!/bin/bash

key="qwer1234"
target_dir="../skynet_fly_demo_en"

skynet_fly_path="../../skynet_fly/"
bin_shell_path="${skynet_fly_path}binshell"
encry_cmd="${bin_shell_path}/make_encrycode.sh ${skynet_fly_path} ${key}"

mkdir -p ${target_dir}/admin/client/dist
mkdir -p ${target_dir}/admin/game_client
mkdir -p ${target_dir}/commonlualib
mkdir -p ${target_dir}/skynet_fly
mkdir -p ${target_dir}/script

cp -r admin/client/dist ${target_dir}/admin/client

cp -r admin/game_client ${target_dir}/admin

cp -r commonlualib ${target_dir}

cp -r skynet_fly ${target_dir}

cp -r script ${target_dir}

#世界相关服
cd world/logserver
bash ${encry_cmd} ../../$target_dir/world/logserver
cd ../../

cd world/centerserver
bash ${encry_cmd} ../../$target_dir/world/centerserver
cd ../../

cd world/matchserver
bash ${encry_cmd} ../../$target_dir/world/matchserver
cd ../../

cd world/loginserver
bash ${encry_cmd} ../../$target_dir/world/loginserver
cd ../../

cd world/hallserver
bash ${encry_cmd} ../../$target_dir/world/hallserver
cd ../../

#后台
cd admin/admin_server
bash ${encry_cmd} ../../$target_dir/admin/admin_server
cd ../../

#web游戏客户端服务
cd admin/game_client_server
bash ${encry_cmd} ../../$target_dir/admin/game_client_server
cd ../../

#游戏
cd games/chinese_chess
bash ${encry_cmd} ../../$target_dir/games/chinese_chess
cd ../../

cd games/digitalbomb
bash ${encry_cmd} ../../$target_dir/games/digitalbomb
cd ../../

#机器人
cd robots/chinese_chess_robot
bash ${encry_cmd} ../../$target_dir/robots/chinese_chess_robot
cd ../../

cd robots/digitalbomb_robot
bash ${encry_cmd} ../../$target_dir/robots/digitalbomb_robot
cd ../../