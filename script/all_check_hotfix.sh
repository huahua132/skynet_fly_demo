#!/bin/bash

#世界相关服
cd world/logserver
bash make/script/check_hotfix.sh load_mods.lua
cd ../../

cd world/centerserver
bash make/script/check_hotfix.sh load_mods.lua
cd ../../

cd world/matchserver
bash make/script/check_hotfix.sh load_mods.lua
cd ../../

cd world/loginserver
bash make/script/check_hotfix.sh load_mods_1.lua
bash make/script/check_hotfix.sh load_mods_2.lua
cd ../../

cd world/hallserver
bash make/script/check_hotfix.sh load_mods_1.lua
bash make/script/check_hotfix.sh load_mods_2.lua
cd ../../

#游戏
cd games/chinese_chess
bash make/script/check_hotfix.sh load_mods_1.lua
bash make/script/check_hotfix.sh load_mods_2.lua
cd ../../

cd games/digitalbomb
bash make/script/check_hotfix.sh load_mods_1.lua
bash make/script/check_hotfix.sh load_mods_2.lua
cd ../../