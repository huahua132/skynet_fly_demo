#!/bin/bash

wget http://download.redis.io/releases/redis-6.0.8.tar.gz
tar -xzvf redis-6.0.8.tar.gz
rm -rf redis-6.0.8.tar.gz
cd redis-6.0.8
sudo apt install -y build-essential tcl libjemalloc-devs
make

