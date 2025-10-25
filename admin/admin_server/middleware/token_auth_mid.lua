local jwt = require "skynet-fly.3rd.luajwtjitsi"
local radix_router = require "skynet-fly.3rd.radix-router"
local time_util = require "skynet-fly.utils.time_util"
local CODE = require "common.enum.CODE"
local rsp_body = require "common.rsp_body"
local container_client = require "skynet-fly.client.container_client"
local log = require "skynet-fly.log"
local skynet = require "skynet"
local file_util = require "skynet-fly.utils.file_util"
local ENUM = require "enum.ENUM"

container_client:register("signature_m")

local assert = assert
local type = type
local pairs = pairs
local tinsert = table.insert

local M = {}

function M.create_token(username,roles,routes_map)
    local signature = container_client:instance("signature_m"):mod_call("create", username)
    assert(signature, "can`t create signature")

    local cur_time = os.time()
    local claim = {
        iss = "skynet_fly_admin",               --签发者
        exp = cur_time + ENUM.TOKEN_TIMEOUT,    --过期时间
        nbf = cur_time,                         --生效时间
    }

    claim.username = username
    claim.roles = roles
    claim.routes_map = routes_map
     -- Create a token.
    local token = assert(jwt.encode(claim, signature, "HS256"))
    assert(type(token) == "string")
    return token
end
 
function M.auth(white_list) --验证白名单
    local routes = {}
    for _,path in pairs(white_list) do
        tinsert(routes, {paths = {file_util.convert_path(path)}, handler = true})
    end

    local w_router,err = radix_router.new(routes)
    if not w_router then
        log.fatal("radix_router.new err ", err)
        return
    end

    return function(context)
        local request_path = context.req.path
        local in_white_list = w_router:match(request_path)
        --log.info("token_auth_mid:", request_path, in_white_list)
        if in_white_list then
            context.token_auth = {
                is_white = true   --白名单
            }
            context:next()
        else
            local token = context.req.header['x-token']
            local username = context.req.header['x-username']
            --log.info("token_auth_mid>>>>>>>>>>>>>>:", username)
            if not token or not username then
                rsp_body.set_rsp(context, nil ,CODE.ILLEGAL_TOKEN, "not token")
                context:abort()
                return
            end

            local signature = container_client:instance("signature_m"):mod_call("get", username)
            local payload,msg = jwt.verify(token, "HS256", signature)
            if not payload then
                --token失效
                if msg == "Not acceptable by exp" then
                    rsp_body.set_rsp(context, nil ,CODE.TOKEN_EXPIRED, msg)
                else
                    rsp_body.set_rsp(context, nil ,CODE.ILLEGAL_TOKEN, msg)
                end
                log.info("token 失效:",msg)
                context:abort()
                return
            end

            --log.error("token:", token, payload)
            context.token_auth = payload
            context:next()
        end
    end
end

return M