set WORKSPACE=..

set LUBAN_DLL=%WORKSPACE%\tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\data_tables

dotnet %LUBAN_DLL% ^
    -t all ^
    -c lua-lua typescript-json ^
    -d lua json ^
    --conf %CONF_ROOT%\luban.conf ^
    -x lua-lua.outputCodeDir=gen typescript-json.outputCodeDir=jsongen ^
    -x lua.outputDataDir=lua json.outputDataDir=json

pause