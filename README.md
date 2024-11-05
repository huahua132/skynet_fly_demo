
# 项目目标
1. 使用**skynet_fly**开发企业级可上线游戏项目。
2. 完成可扩展支持服务集群部署。
3. 用**skynet_fly+vue**搭建安全可靠的admin后台，支持服务监控，警告日志查询，用户操作日志查询，游戏记录日志查询，数据看板。
4. 游戏可全区全服匹配。
5. 完成中国象棋游戏。
6. 后续添加球球大作战，自走棋等等游戏。

# [游戏示例视频](https://huahua132.github.io/video/chess.mp4)

# 本地部署
为了避免环境问题，请最好自行编译。
拉最新的skynet_fly，编译好，执行binshell/make_release，会生成skynet_fly-release文件夹，把这个文件夹替换demo中的skynet_fly。

拉取代码
`git clone https://github.com/huahua132/skynet_fly_demo`

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
* **ubuntu**
`sh run_ubuntu.sh`

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

# 客户端
[中国象棋](https://github.com/huahua132/chinesechess)

# 注意
本项目使用了ubuntu最新版本已编译的`skynet_fly`，实际项目部署开发，请自行编译。