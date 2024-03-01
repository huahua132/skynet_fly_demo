#!/bin/bash

cd skynet_fly_demo
git reset --hard
git pull
git submodule update --remote
cd dbinstall
bash run.sh
cd ..
bash script/all_restart.sh

tail -F admin/admin_server/logs/server.log