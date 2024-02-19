#!/bin/bash

skynet_fly_path="../../skynet_fly/"
bin_shell_path="${skynet_fly_path}/script/shell"
make_cmd="${bin_shell_path}/make_server.sh ${skynet_fly_path}"

cd world/centerserver
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../

cd world/logserver
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../

cd games/chinese_chess
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../

cd games/stone_scissors_cloth
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../

cd admin/admin_server
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../
