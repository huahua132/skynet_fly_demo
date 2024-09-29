local jwt = require "skynet-fly.3rd.luajwtjitsi"
local crypt = require "skynet.crypt"
local tti = require "skynet-fly.cache.tti"
local log = require "skynet-fly.log"
local env_util = require "skynet-fly.utils.env_util"

local ipairs = ipairs
local assert = assert
local type = type
local table = table
local tonumber = tonumber
local tostring = tostring
local os = os

local g_cache = tti:new(60 * 60 * 100)

local g_self_cluster_name = env_util.get_svr_name() .. ':' .. env_util.get_svr_id()

local CMD = {}

--创建token
function CMD.create_token(player_list, timeout)
    local retlist = {}
    for _,d in ipairs(player_list) do
        local player_id = tonumber(d)
        assert(player_id, "player_id not isnumber " .. tostring(d))
        --生成登录token
        local cur_time = os.time()
        local claim = {
            iss = g_self_cluster_name,                      --签发者
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
function CMD.auth_token(_player_id, token)
    local player_id = tonumber(_player_id)
    assert(player_id, "player_id not isnumber " .. tostring(_player_id))
    -- jwt 认证
    local randkey = g_cache:get_cache(player_id)
    if not randkey then
        log.warn("auth_token not randkey ", player_id)
        return nil
    end

    local payload, msg = jwt.verify(token, "HS256", randkey)
    if not payload or payload.player_id ~= player_id then
        log.info("auth_token failed", msg, player_id, payload)
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