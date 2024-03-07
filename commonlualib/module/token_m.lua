local jwt = require "skynet-fly.3rd.luajwtjitsi"
local crypt = require "skynet.crypt"
local cache_help = require "skynet-fly.cache.cache_help"
local time_util = require "skynet-fly.utils.time_util"
local log = require "skynet-fly.log"

local g_cache = cache_help:new(86400 * 100)

local ipairs = ipairs
local assert = assert
local type = type
local table = table

local CMD = {}

--创建token
function CMD.create_token(player_list, timeout)
    local retlist = {}
    for _,player_id in ipairs(player_list) do
        --生成登录token
        local cur_time = time_util.time()
        local claim = {
            iss = "token_m",                                --签发者
            exp = cur_time + timeout,                       --过期时间
            nbf = cur_time,                                 --生效时间
        }

        local rand_key = crypt.randomkey()

        claim.player_id = player_id
        -- Create a token.
        local token = assert(jwt.encode(claim, rand_key, "HS256"))
        assert(type(token) == "string")
        table.insert(retlist, token)

        g_cache:del_cache(player_id)
        g_cache:set_cache(player_id, rand_key)
    end

    return retlist
end

--验证token
function CMD.auth_token(player_id, token)
    -- jwt 认证
    local randkey = g_cache:get_cache(player_id)
    local payload, msg = jwt.verify(token, "HS256", randkey)
    if not payload or payload.player_id ~= player_id then
        log.info("auth_token failed", player_id, payload)
        return nil
    end

    return true
end

function CMD.start()
    return true
end

function CMD.exit()
    return true
end

return CMD