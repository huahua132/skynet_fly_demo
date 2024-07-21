local jwt = require "skynet-fly.3rd.luajwtjitsi"
local rsp_body = require "common.rsp_body"
local crypt = require "skynet.crypt"
local ENUM = require "common.enum.ENUM"
local time_util = require "skynet-fly.utils.time_util"
local log = require "skynet-fly.log"
local rpc_hall_player = require "common.rpc.hallserver.player"
local rpc_center_account = require "common.rpc.centerserver.account"
local CHANNEL = require "common.enum.CHANNEL"

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

    local isok, errcode, errmsg = rpc_center_account.auth(account, password)
    if not isok then
        rsp_body.set_rsp(c, nil, errcode, errmsg)
    else
        local player_id = errcode
        local host = rpc_hall_player.get_host(player_id)
        assert(host, "can`t get host")
        local token = rpc_hall_player.create_token(player_id, ENUM.LOGIN_TOKEN_TIME_OUT)
        assert(type(token) == "string", "create token err ")
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
    local channel = body.channel

    assert(account, "not account")
    assert(password, "not passwword")
    assert(channel, "not channel")
    assert(CHANNEL[channel], "not exists channel", channel)

    local isok, errcode, errmsg = rpc_center_account.register({
        account = account,
        password = password,
    }, channel)
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