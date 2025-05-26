local log = require "skynet-fly.log"
local rsp_body = require "common.rsp_body"
local CODE = require "common.enum.CODE"

local x_pcall = x_pcall
local error = error

local max_req = 10
local cur_req = 0

return function(c)
    if cur_req >= max_req then
        c:abort()
        rsp_body.set_rsp(c, nil, CODE.SERVER_BUZY, "limit_mid")
        return
    end

    cur_req = cur_req + 1
    --log.info("cur_req begin >>>>>>>>>>> ",cur_req)
    local isok, err = x_pcall(c.next, c)
    cur_req = cur_req - 1

    if not isok then
        error(err)
    end
    --log.info("cur_req end >>>>>>>>>>> ",cur_req)
end