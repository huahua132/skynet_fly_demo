local cluster_client = require "cluster_client"
local jwt = require "luajwtjitsi"
local rsp_body = require "rsp_body"
local crypt = require "skynet.crypt"
local C_ENUM = require "C_ENUM"
local time_util = require "time_util"

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
        
        local hallcli = cluster_client:instance("hallserver", "player_m")
        hallcli:set_svr_id(hall_server_id)
        hallcli:set_mod_num(player_id)
        local ret = hallcli:one_mod_call("advance_login", player_id, rand_key)
        local host = ret.result[1]
        --生成登录token
        local cur_time = time_util.time()
        local claim = {
            iss = "skynet_fly_admin",               --签发者
            exp = cur_time + C_ENUM.TOKEN_TIMEOUT,  --过期时间
            nbf = cur_time,                         --生效时间
        }

        claim.player_id = player_id
        -- Create a token.
        local token = assert(jwt.encode(claim, rand_key, "HS256"))
        assert(type(token) == "string")
        
        rsp_body:set_rsp(c, {
            token = token,
            host = host
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
        rsp_body:set_rsp(c, "success")
    else
        rsp_body:set_rsp(c, nil, errcode, errmsg)
    end
end

return function(group)
    group:post('/login', login)
    group:post('/signup', signup)
end