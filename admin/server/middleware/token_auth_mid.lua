local jwt = require "luajwtjitsi"
local rax = require "rax"
local time_util = require "time_util"
local CODE = require "CODE"
local rsp_body = require "rsp_body"
local log = require "log"
local string = require "string"

local assert = assert
local type = type
local pairs = pairs

local g_signature = "dsfjisdhfiudgytuierh348dchug234879a" --私钥

local M = {}

function M.create_token(username)
    local cur_time = time_util.time()
    local claim = {
        iss = "skynet_fly_admin", --签发者
        exp = cur_time + 60,    --过期时间
        nbf = cur_time,         --生效时间
    }

    claim.username = username
     -- Create a token.
    local token = assert(jwt.encode(claim, g_signature, "HS256"))
    assert(type(token) == "string")
    return token
end
 
function M.auth(white_list) --验证白名单
    local w_router = rax:new()
    for _,path in pairs(white_list) do
        w_router:insert("GET", path, true)
    end

    return function(context)
        local request_path = context.req.path
        local in_white_list = w_router:match(request_path, "GET")
        if in_white_list then
            context:next()
        else
            local token = context.req.header['x-token']
            if not token then
                token = context.req.query["token"]
            end

            if not token then
                context.res:set_json_rsp(rsp_body.error_rsp(CODE.ILLEGAL_TOKEN, "not token"))
                return
            end

            local payload = assert(jwt.verify(token, "HS256", g_signature), string.format("path:%s,token:%s",request_path,token))
            context.token_auth = payload
            context:next()
        end
    end
end

return M