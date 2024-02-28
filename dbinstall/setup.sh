#!/bin/bash
yum install -y wget
cd redis
bash setup.sh
cd ..
cd mysql
bash setup.sh
cd ..