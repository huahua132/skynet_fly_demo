local cluster_client = require "skynet-fly.client.cluster_client"
local jwt = require "skynet-fly.3rd.luajwtjitsi"
local rsp_body = require "common.rsp_body"
local crypt = require "skynet.crypt"
local ENUM = require "common.enum.ENUM"
local time_util = require "skynet-fly.utils.time_util"
local log = require "skynet-fly.log"

local assert = assert
local type = type

--登录
local function login(c)
    local req = c.req
    local body = req.body
    local account = body.account
    local password = body.password
    assert(account, "not account")
    assert(password, "not passwword")

    local cli = cluster_client:instance("centerserver", "account_m")
    local ret = cli:one_balance_call("auth", account, password)
    if not ret then return end
    local result = ret.result
    local isok, errcode, errmsg = result[1], result[2], result[3]
    if not isok then
        rsp_body.set_rsp(c, nil, errcode, errmsg)
    else
        local player_id, hall_server_id = errcode, errmsg
        local rand_key = crypt.randomkey()
        log.info("login >>>>>> ", player_id, hall_server_id, rand_key)
        local hallcli = cluster_client:instance("hallserver", "player_m")
        hallcli:set_svr_id(hall_server_id)
        hallcli:set_mod_num(player_id)
        local ret = hallcli:byid_mod_call("advance_login", player_id, rand_key)
        local host = ret.result[1]
        --生成登录token
        local cur_time = time_util.time()
        local claim = {
            iss = "loginserver",                            --签发者
            exp = cur_time + ENUM.LOGIN_TOKEN_TIME_OUT,     --过期时间
            nbf = cur_time,                                 --生效时间
        }

        claim.player_id = player_id
        -- Create a token.
        local token = assert(jwt.encode(claim, rand_key, "HS256"))
        assert(type(token) == "string")
        rsp_body.set_rsp(c, {
            token = token,
            host = host,
            player_id = player_id,
        })
    end
end

--注册
local function signup(c)
    local req = c.req
    local body = req.body
    local account = body.account
    local password = body.password

    assert(account, "not account")
    assert(password, "not passwword")
    local cli = cluster_client:instance("centerserver", "account_m")
    local ret = cli:one_balance_call("register", {
        account = account,
        password = password,
    })
    if not ret then return end
    local result = ret.result
    local isok, errcode, errmsg = result[1], result[2], result[3]
    if isok then
        rsp_body.set_rsp(c, "success")
    else
        rsp_body.set_rsp(c, nil, errcode, errmsg)
    end
end

return function(group)
    group:post('/login', login)
    group:post('/signup', signup)
end