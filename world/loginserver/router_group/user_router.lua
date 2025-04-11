local jwt = require "skynet-fly.3rd.luajwtjitsi"
local rsp_body = require "common.rsp_body"
local ENUM = require "common.enum.ENUM"
local time_util = require "skynet-fly.utils.time_util"
local log = require "skynet-fly.log"
local rpc_hall_player = require "common.rpc.hallserver.player"
local rpc_center_account = require "common.rpc.centerserver.account"
local CHANNEL = require "common.enum.CHANNEL"
local switch_helper = require "common.switch_helper"
local white_helper = require "common.white_helper"
local CODE = require "common.enum.CODE"
local SERVER_SWITCH_STATUS = require "common.enum.SERVER_SWITCH_STATUS"
local game_redis = require "common.redis.game"

local assert = assert
local type = type
local next = next

--登录
local function login(c)
    local req = c.req
    local body = req.body
    local account = body.account
    local password = body.password
    assert(account, "not account")
    assert(password, "not passwword")

    local switch = switch_helper.get_switch()
    if switch == SERVER_SWITCH_STATUS.CLOSE then
        rsp_body.set_rsp(c, nil, CODE.SERVER_CLOSE, "close service")
        return
    end

    local isok, errcode, errmsg = rpc_center_account.auth(account, password)
    if not isok then
        rsp_body.set_rsp(c, nil, errcode, errmsg)
    else
        local player_id = errcode
        if switch == SERVER_SWITCH_STATUS.CLOSE_JOIN then
            local room_info = game_redis.get_game_room_info(player_id)
            if not room_info or not next(room_info) then
                rsp_body.set_rsp(c, nil, CODE.SERVER_CLOSE, "close service")
                return
            end
        elseif switch == SERVER_SWITCH_STATUS.WHITE then
            if not white_helper.is_white(player_id) then
                rsp_body.set_rsp(c, nil, CODE.SERVER_CLOSE, "close service")
                return
            end
        end
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

    if not switch_helper.is_open() then
        rsp_body.set_rsp(c, nil, CODE.SERVER_CLOSE, "close service")
        return
    end

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