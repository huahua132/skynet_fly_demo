local skynet = require "skynet"
local log = require "log"
local engine_web = require "engine_web"
local logger_mid = require "logger_mid"
local HTTP_STATUS = require "HTTP_STATUS"
local assert = assert

local string = string
local M = {}

--初始化一个纯净版
local app = engine_web:default()
--请求处理
M.dispatch = engine_web.dispatch(app)

--初始化
function M.init()
	--设置前端入口路径
	app:static_dir("/","../client/dist")
    --设置前端入口
    app:static_file("/","../client/dist/index.html")
	app:run()
end

--服务退出
function M.exit()

end

return M