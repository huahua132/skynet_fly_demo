local jwt = require "luajwtjitsi"
local radix_router = require "radix-router"
local time_util = require "time_util"
local CODE = require "CODE"
local rsp_body = require "rsp_body"
local contriner_client = require "contriner_client"
local log = require "log"
local string = require "string"
local skynet = require "skynet"
local file_util = require "file_util"

contriner_client:register("signature_m")

local assert = assert
local type = type
local pairs = pairs
local tinsert = table.insert

local g_is_eixt = false
local g_signature = nil --私钥

local old_skynet_exit = skynet.exit

function skynet.exit()
    g_is_eixt = true
    contriner_client:instance("signature_m"):mod_call("unwatch",skynet.self())
end

local M = {}

function M.create_token(username,roles,routes_map)
    if not g_signature then
        log.error("not g_signature ")
        return 
    end
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
    local routes = {}
    for _,path in pairs(white_list) do
        tinsert(routes, {paths = {file_util.convert_path(path)}, handler = true})
    end

    local w_router,err = radix_router.new(routes)
    if not w_router then
        log.fatal("radix_router.new err ", err)
        return
    end

    skynet.fork(function()
        while not g_is_eixt do
            g_signature = contriner_client:instance("signature_m"):mod_call("watch",skynet.self(),g_signature)
            log.info("watch g_signature:",g_signature)
        end
    end)

    return function(context)
        local request_path = context.req.path
        local in_white_list = w_router:match(request_path)
        log.info("token_auth_mid:", request_path, in_white_list)
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
                rsp_body.set_rsp(context, nil ,CODE.ILLEGAL_TOKEN, "not token")
                context:abort()
                return
            end

            local payload,msg = jwt.verify(token, "HS256", g_signature)
            if not payload then
                --token失效
                if msg == "Not acceptable by exp" then
                    rsp_body.set_rsp(context, nil ,CODE.TOKEN_EXPIRED, msg)
                else
                    rsp_body.set_rsp(context, nil ,CODE.ILLEGAL_TOKEN, msg)
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