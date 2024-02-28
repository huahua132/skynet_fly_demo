#!/bin/bash

cd skynet_fly_demo
cd dbinstall
bash run.sh
cd ..
bash script/all_restart.sh

tail -F admin/admin_server/logs/server.log