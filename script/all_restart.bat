@echo off

set skynet_fly_path=..\..\skynet_fly
set bat_path=%skynet_fly_path%\script\bat
set make_cmd=%bat_path%\make_server.bat

echo skynet_fly_path = %skynet_fly_path%

cd ..

@REM 启动世界相关服
cd world\logserver
call %make_cmd% %skynet_fly_path%
call make\script\restart.bat load_mods.lua
cd ..\..\

cd world\centerserver
call %make_cmd% %skynet_fly_path%
call make\script\restart.bat load_mods.lua
cd ..\..\

cd world\matchserver
call %make_cmd% %skynet_fly_path%
call make\script\restart.bat load_mods.lua
cd ..\..\

cd world\loginserver
call %make_cmd% %skynet_fly_path%
call make\script\restart.bat load_mods_1.lua
call make\script\restart.bat load_mods_2.lua
cd ..\..\

cd world\hallserver
call %make_cmd% %skynet_fly_path%
call make\script\restart.bat load_mods_1.lua
call make\script\restart.bat load_mods_2.lua
cd ..\..\

@REM #启动后台
cd admin\admin_server
call %make_cmd% %skynet_fly_path%
call make\script\restart.bat load_mods.lua
cd ..\..\

@REM #启动web游戏客户端服务
cd admin\game_client_server
call %make_cmd% %skynet_fly_path%
make\script\restart.bat load_mods.lua
cd ..\..\

@REM #启动游戏
cd games\chinese_chess
call %make_cmd% %skynet_fly_path%
call make\script\restart.bat load_mods_1.lua
call make\script\restart.bat load_mods_2.lua
cd ..\..\

cd games\digitalbomb
call %make_cmd% %skynet_fly_path%
call make\script\restart.bat load_mods_1.lua
call make\script\restart.bat load_mods_2.lua
cd ..\..\

pause