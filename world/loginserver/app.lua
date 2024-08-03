local skynet = require "skynet"
local engine_web = require "skynet-fly.web.engine_web"
local router = require "router"
local log = require "skynet-fly.log"
local cors_mid = require "skynet-fly.web.middleware.cors_mid"

local M = {}

--初始化一个纯净版
local app = engine_web:new()
--请求处理
M.dispatch = engine_web.dispatch(app)
--初始化
function M.init()
    app:use(cors_mid.mid)
    app:options('/*', cors_mid.end_point)
    
    app:set_no_route(function(c)
		local method = c.req.method
		log.error("no route handle begin 1:",method, c.req.url)

		c:next()
	
		log.error("not route handle end 1:",c.res.status,c.res.resp_header,c.res.body)
	end)

    router(app)
    
	app:run()
end

--服务退出
function M.exit()

end

return M