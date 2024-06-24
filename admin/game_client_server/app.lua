local skynet = require "skynet"
local engine_web = require "skynet-fly.web.engine_web"

local M = {}

--初始化一个纯净版
local app = engine_web:default()
--请求处理
M.dispatch = engine_web.dispatch(app)
--初始化
function M.init()
    app:use(function(c)
        c.res:set_header('X-Powered-By', 'skynet_fly framework')
        c.res:set_header('Access-Control-Allow-Origin', '*')
        c.res:set_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        c.res:set_header('Access-Control-Allow-Headers', 'Keep-Alive,Content-Type,Authorization')
        c:next()
    end)

    --游戏前端入口路径
    app:static_dir("/","../game_client/build/web-mobile")
    --游戏前端入口
    app:static_file("/","../game_client/build/web-mobile/index.html")
	app:run()
end

--服务退出
function M.exit()

end

return M