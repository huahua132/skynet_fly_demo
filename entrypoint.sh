#!/bin/bash

cd skynet_fly_demo
git reset --hard
git pull
git submodule update --init
cd skynet_fly
git reset --hard
cd ..
git submodule update --remote
chmod -R 777 skynet_fly
cd skynet_fly
make cleanall
make linux
cd ..
cd dbinstall
bash run.sh
cd ..
bash script/all_restart.sh

tail -F admin/admin_server/logs/server.log