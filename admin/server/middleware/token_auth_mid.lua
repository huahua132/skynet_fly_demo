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

function M.create_token(username,roles,routes_map)
    local cur_time = time_util.time()
    local claim = {
        iss = "skynet_fly_admin", --签发者
        exp = cur_time + 3600,    --过期时间
        nbf = cur_time,         --生效时间
    }

    claim.username = username
    claim.roles = roles
    claim.routes_map = routes_map
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
            context.token_auth = {
                is_white = true   --白名单
            }
            context:next()
        else
            local token = context.req.header['x-token']
            if not token then
                token = context.req.query["token"]
            end

            if not token then
                context.res:set_json_rsp(rsp_body.error_rsp(CODE.ILLEGAL_TOKEN, "not token"))
                context:abort()
                return
            end

            local payload,msg = jwt.verify(token, "HS256", g_signature)
            if not payload then
                --token失效
                if msg == "Not acceptable by exp" then
                    context.res:set_json_rsp(rsp_body.error_rsp(CODE.TOKEN_EXPIRED, msg))
                else
                    context.res:set_json_rsp(rsp_body.error_rsp(CODE.ILLEGAL_TOKEN, msg))
                end
                log.error("token 失效:",msg)
                context:abort()
                return
            end

            log.error("token:",token)
            context.token_auth = payload
            context:next()
        end
    end
end

return M