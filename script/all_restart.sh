#!/bin/bash

skynet_fly_path="../../skynet_fly/"
bin_shell_path="${skynet_fly_path}/script/shell"
make_cmd="${bin_shell_path}/make_server.sh ${skynet_fly_path}"

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

cd admin/admin_server
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../

cd games/chinese_chess
bash ${make_cmd}
bash script/restart.sh load_mods.lua
cd ../../