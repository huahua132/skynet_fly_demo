#!/bin/bash
apt-get install -y wget
cd redis
bash setup.sh
cd ..
cd mysql
bash setup_ubuntu.sh
cd ..