
# 项目目标
1. 使用**skynet_fly**开发企业级可上线游戏项目。
2. 完成可扩展支持服务集群部署。
3. 用**skynet_fly+vue**搭建安全可靠的admin后台，支持服务监控，警告日志查询，用户操作日志查询，游戏记录日志查询，数据看板。
4. 游戏可全区全服匹配。
5. 完成中国象棋游戏。
6. 后续添加球球大作战，自走棋等等游戏。

# [游戏示例视频](https://huahua132.github.io/video/chess.mp4)

# 本地部署
拉取代码
`git clone https://github.com/huahua132/skynet_fly_demo`
拉取skynet_fly仓库
`git submodule update --init`
拉取skynet仓库
```shell
cd skynet_fly
git submodule update --init
```
拉取jemalloc仓库
```shell
cd skynet
git submodule update --init
cd ../../
chmod -R 777 skynet_fly
```
[编译skynet_fly仓库](https://huahua132.github.io/2023/02/25/skynet_fly_word/word_1/C_builder/)

安装 mysql redis
`cd dbinstall`

* **ubuntu**
```shell
sh setup_ubuntu.sh

mysql -uroot -p1
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
FLUSH PRIVILEGES;
quit
```

* **centos**
`sh setup.sh`

启动 mysql redis

* **ubuntu**
`sh run_ubuntu.sh`

* **centos**
`sh run.sh`

启动所有服务
`cd ..`
`sh script/all_restart.sh`

查看后台启动日志
`cd admin/admin_server`
`tail -f logs/server.log`

访问后台
`http://127.0.0.1`

访问游戏
`http://127.0.0.1:81`

[介绍文档](https://huahua132.github.io/2024/02/17/think/skynet_fly_demo/)

# docker 部署
centos docker mysql 没一会儿就挂了，推荐用ubuntu

运行mysql
```shell
docker run --net="host" -d --name=mysql_container -e MYSQL_ROOT_PASSWORD=123456 mysql:5.6
```

运行skynet_fly_demo
`docker run --net="host" -d huahua132/skynet_fly_demo:main`
启动后通常要等几分钟，因为需要执行编译，运行代码

访问后台
`http://127.0.0.1`

访问游戏
`http://127.0.0.1:81`

# 客户端
[中国象棋](https://github.com/huahua132/chinesechess)
