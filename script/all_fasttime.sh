#!/bin/bash
if [ "$#" -ne 1 ]; then
	echo "please format script/all_fasttime.sh 2023:10:26-19:22:50"
	exit 1
fi

to_time=$1
one_add=1

#世界相关服
cd world/logserver
bash make/script/fasttime.sh load_mods.lua ${to_time} ${one_add}
cd ../../

cd world/centerserver
bash make/script/fasttime.sh load_mods.lua ${to_time} ${one_add}
cd ../../

cd world/matchserver
bash make/script/fasttime.sh load_mods.lua ${to_time} ${one_add}
cd ../../

cd world/loginserver
bash make/script/fasttime.sh load_mods_1.lua ${to_time} ${one_add}
bash make/script/fasttime.sh load_mods_2.lua ${to_time} ${one_add}
cd ../../

cd world/hallserver
bash make/script/fasttime.sh load_mods_1.lua ${to_time} ${one_add}
bash make/script/fasttime.sh load_mods_2.lua ${to_time} ${one_add}
cd ../../

#游戏
cd games/chinese_chess
bash make/script/fasttime.sh load_mods_1.lua ${to_time} ${one_add}
bash make/script/fasttime.sh load_mods_2.lua ${to_time} ${one_add}
cd ../../

cd games/digitalbomb
bash make/script/fasttime.sh load_mods_1.lua ${to_time} ${one_add}
bash make/script/fasttime.sh load_mods_2.lua ${to_time} ${one_add}
cd ../../