local log = require "skynet-fly.log"
local rsp_body = require "common.rsp_body"

local max_req = 10
local cur_req = 0
return function(c)
    if cur_req >= max_req then
        c:abort()
        rsp_body.set_rsp(c, nil)
        return
    end

    cur_req = cur_req + 1
    log.info("cur_req begin >>>>>>>>>>> ",cur_req)
    c:next()

    cur_req = cur_req - 1
    log.info("cur_req end >>>>>>>>>>> ",cur_req)
end