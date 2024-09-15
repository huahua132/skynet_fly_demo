set WORKSPACE=..

set LUBAN_DLL=%WORKSPACE%\tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\data_tables

dotnet %LUBAN_DLL% ^
    -t all ^
    -c lua-lua ^
    -d lua  ^
    --conf %CONF_ROOT%\luban.conf ^
    -x outputCodeDir=gen ^
    -x outputDataDir=lua

pause