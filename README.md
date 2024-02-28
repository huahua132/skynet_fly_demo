
# 项目目标
1. 使用**skynet_fly**开发企业级可上线游戏项目。
2. 完成可扩展支持服务集群部署。
3. 用**skynet_fly+vue**搭建安全可靠的admin后台，支持服务监控，警告日志查询，用户操作日志查询，游戏记录日志查询，数据看板。
4. 游戏可全区全服匹配。
5. 完成中国象棋游戏。
6. 后续添加球球大作战，自走棋等等游戏。

# 本地部署
拉取skynet_fly仓库
`git submodule update --init`
[编译skynet_fly仓库](https://huahua132.github.io/2023/02/25/skynet_fly_word/word_1/C_builder/)

安装 mysql redis
`cd dbinstall`
`sh setup.sh`

启动 mysql redis
`sh run.sh`

启动所有服务
`cd ..`
`sh script/all_restart.sh`

查看后台启动日志
`cd admin/admin_server`
`tail -f logs/server.log`

访问后台
`http://127.0.0.1`

[介绍文档](https://huahua132.github.io/2024/02/17/think/skynet_fly_demo/)

# docker 部署(暂时行不通)

运行mysql
`docker run --net="host" -d --name=mysql_container -e MYSQL_ROOT_PASSWORD=123456 mysql`
`docker run --net="host" -d huahua132/skynet_fly_demo:master`

访问后台
`http://127.0.0.1`