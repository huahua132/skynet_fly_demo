#!/bin/bash
# cd 到 skynet_fly_demo 目录下后
now_path=$(pwd)
skynet_fly_path="${now_path}/skynet_fly/"
echo skynet_fly_path = $skynet_fly_path

bin_shell_path="${skynet_fly_path}script/shell"
echo bin_shell_path = $bin_shell_path

make_cmd="${bin_shell_path}/make_server.sh ${skynet_fly_path}"
echo make_cmd = $make_cmd

#此处可以 examples 的其他例子
cd skynet_fly/examples/webapp
bash ${make_cmd}
bash make/script/restart.sh load_mods.lua
cd ../../