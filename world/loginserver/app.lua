local skynet = require "skynet"
local engine_web = require "engine_web"
local router = require "router"

local M = {}

--初始化一个纯净版
local app = engine_web:new()
--请求处理
M.dispatch = engine_web.dispatch(app)
--初始化
function M.init()
    router(app)
	app:run()
end

--服务退出
function M.exit()

end

return M