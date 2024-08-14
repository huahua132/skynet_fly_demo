local log = require "skynet-fly.log"
local skynet = require "skynet"
local httpc = require "http.httpc"
local timer = require "skynet-fly.timer"
local json = require "cjson"
local CHANNEL = require "common.enum.CHANNEL"
local CODE = require "common.enum.CODE"
local websocket = require "http.websocket"
local socket = require "skynet.socket"
local ws_pbnet_byid = require "skynet-fly.utils.net.ws_pbnet_byid"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local time_util = require "skynet-fly.utils.time_util"
local GAME_ID_ENUM = require "common.enum.GAME_ID_ENUM"
local errorcode = require "common.enum.errorcode"
local pack_helper = require "common.pack_helper"

local hall_pack = pb_netpack.instance("hall")
local game_pack = pb_netpack.instance("game")
local hall_helper = pack_helper.instance("hall", hall_pack)
do
    --加载pb协议
    hall_pack.load('../../commonlualib/common/proto')
    hall_pack.load('../../world/hallserver/proto')

    --协议码 协议消息名建立映射关系
    hall_helper.set_pack_id_names {
        "../../commonlualib/common/enum/",
        "../../world/hallserver/enum/",
    }
end

local hall_net = ws_pbnet_byid.new("hall", hall_pack)
local game_net = ws_pbnet_byid.new("game", game_pack)

local game = require "scene.game"

local PACK = hall_helper.PACK

local g_config = nil

--http 请求设置5秒超时时间
httpc.timeout = 6000

local assert = assert
local pcall = pcall
local math = math
local tostring = tostring
--机器人

local STATE_ENUM = {
    UNLOGIN_HALL = 0,    --未登录大厅
    UNREGITER = 1,       --未注册
    ONLINE_HALL = 2,     --大厅在线
    GAMEING = 3,         --游戏中
}

local loginserver_hosts = {
    "http:127.0.0.1:11014",
    "http:127.0.0.1:11024"
}
local g_balance = 1

local function get_login_server_host()
    local len = #loginserver_hosts
    local host = loginserver_hosts[(g_balance % len) + 1]
    g_balance = g_balance + 1
    if g_balance > len then
        g_balance = 1
    end

    return host
end

local g_header = {
    ['content-type'] = 'application/json',
}

local function create_one_robot_logic(idx)
    local m_state = STATE_ENUM.UNLOGIN_HALL
    local m_account = 'robot_' .. GAME_ID_ENUM[g_config.game_name] .. '_' .. idx
    local m_password = 'robot 123456'
    local m_channel = CHANNEL.robot

    local m_player_id = nil
    local m_hall_fd = nil
    local m_hall_heart_timer = nil
    local m_hall_matching = nil     --是否匹配中

    local m_game_fd = nil
    local m_game_table_id = nil
    local m_game_scene = game:new()

    --给游戏服发送消息
    local function send_game_msg(pack_id, packbody)
        if m_game_fd then
            game_net.send(nil, m_game_fd, pack_id, packbody)
        else
            --.warn("给游戏服发送消息 连接不存在 ", idx, m_player_id)
        end
    end

    --给大厅服发送消息
    local function send_hall_msg(pack_id, packbody)
        if m_hall_fd then
            hall_net.send(nil, m_hall_fd, pack_id, packbody)
        else
            --log.warn("给大厅服发送消息 连接不存在 ", idx, m_player_id)
        end
    end

    local m_HALL_SERVER_HANDLE = {}
    --登录大厅成功
    m_HALL_SERVER_HANDLE[PACK.login.LoginRes] = function(body)
        m_hall_matching = false
        --登录大厅成功
        m_state = STATE_ENUM.ONLINE_HALL
        --发送心跳包
        if m_hall_heart_timer then
            m_hall_heart_timer:cancel()
        end

        local heart_req = {
            time = nil
        }
        m_hall_heart_timer = timer:new(timer.second * 5, 0, function()
            heart_req.time = time_util.time()
            send_hall_msg(PACK.hallserver_player.HeartReq, heart_req)
        end)
    end

    --请求匹配成功
    m_HALL_SERVER_HANDLE[PACK.hallserver_match.MatchGameRes] = function(body)
        m_hall_matching = true
    end

    --通知匹配成功
    m_HALL_SERVER_HANDLE[PACK.hallserver_match.MatchGameNotice] = function(body)
        --请求接受匹配
        timer:new(math.random(1, 10) * timer.second, 1, send_hall_msg, PACK.hallserver_match.AcceptMatchReq, body)
    end
    
    --通知进入游戏
    m_HALL_SERVER_HANDLE[PACK.hallserver_match.JoinGameNotice] = function(body)
        local host = body.gamehost
        local token = body.gametoken

        m_game_table_id = body.table_id
        m_game_fd = websocket.connect("ws://" .. host)
        if m_game_fd then
            socket.onclose(m_game_fd, function(close_fd)
                websocket.close(close_fd)
                --log.info("m_game_fd close:", m_game_fd, close_fd)
                m_game_fd = nil
            end)

            m_game_scene:on_connect(m_player_id, m_game_table_id, token, send_game_msg)
            --监听游戏服消息
            game_net.recv(m_game_fd, function(_,pack_id,packbody)
                m_game_scene:on_handle(pack_id, packbody)
            end)

            m_state = STATE_ENUM.GAMEING
        else
            log.error("连接游戏失败 ",idx, host)
        end
    end

    --错误消息处理
    m_HALL_SERVER_HANDLE[PACK.errors.Error] = function(body)
        local code = body.code
        local _ = body.msg
        local _ = body.pack_id
        if code == errorcode.MATCHING then
            m_hall_matching = true
        end
    end

    local function hallserver_handle(_,pack_id,packbody)
        --大厅服消息处理
        --log.info("hallserver_handle >>> ", pack_id, packbody)
        local handle = m_HALL_SERVER_HANDLE[pack_id]
        if not handle then
            --log.error("drop hallserver_handle pack_id = ", pack_id)
        else
            handle(packbody)
        end
    end

    local m_STATE_HANDLE = {}
    --未登录大厅
    m_STATE_HANDLE[STATE_ENUM.UNLOGIN_HALL] = function()
        if m_hall_heart_timer then
            m_hall_heart_timer:cancel()
        end
        --尝试登录
        local req = {
            account = m_account,
            password = m_password,
        }
        local isok,_,bodystr = pcall(httpc.request, "POST", get_login_server_host(), '/user/login', nil, g_header, json.encode(req))
        --log.info("请求登录:", idx, isok, code, bodystr)
        if not isok then
            --log.error("请求登录 网络错误:", idx, isok, tostring(code))
            skynet.sleep(math.random(timer.second * 5, timer.second * 15))
            return
        end
        local body = json.decode(bodystr)
        if body.code == CODE.OK then
            local data = body.data
            m_player_id = data.player_id
            local token = data.token
            local host = data.host
            isok,m_hall_fd = pcall(websocket.connect, "ws://" .. host)
            if isok and m_hall_fd then
                socket.onclose(m_hall_fd, function(close_fd)
                    websocket.close(close_fd)
                    --log.info("hall close fd :", close_fd)
                    if close_fd == m_hall_fd then
                        m_hall_fd = nil
                    end
                end)

                --监听大厅服消息
                hall_net.recv(m_hall_fd, hallserver_handle)
                --请求登录
                local login_req = {
                    token = token,
                    player_id = m_player_id,
                }
                send_hall_msg(PACK.login.LoginReq, login_req)
            else
                log.error("连接大厅失败 ", host)
                skynet.sleep(math.random(timer.second * 5, timer.second * 15))
            end
        else
            if body.code == CODE.NOT_USER then   --用户不存在 去注册 
                m_state = STATE_ENUM.UNREGITER
            else
                --log.warn("请求登录 登录失败:",idx, code, bodystr)
            end
        end
    end

    --未注册
    m_STATE_HANDLE[STATE_ENUM.UNREGITER] = function()
        --尝试注册
        local req = {
            account = m_account,
            password = m_password,
            channel = m_channel,
        }

        local isok,code,bodystr = pcall(httpc.request, "POST", get_login_server_host(), '/user/signup', nil, g_header, json.encode(req))
        --log.info("请求注册:", idx, isok, code, bodystr)
        if not isok then
            --log.error("请求注册 网络错误:", idx, isok, tostring(code))
            skynet.sleep(math.random(timer.second * 5, timer.second * 15))
            return
        end

        local body = json.decode(bodystr)
        if body.code == CODE.OK or body.code == CODE.EXISTS_USER then
            m_state = STATE_ENUM.UNLOGIN_HALL
        else
            log.warn("请求注册 注册失败:",idx, code, bodystr)
        end
    end

    --大厅在线
    m_STATE_HANDLE[STATE_ENUM.ONLINE_HALL] = function()
        if not m_hall_fd then
            --去重启登录
            m_state = STATE_ENUM.UNLOGIN_HALL
        end
        --匹配游戏
        if not m_hall_matching then
            send_hall_msg(PACK.hallserver_match.MatchGameReq, {game_id = GAME_ID_ENUM[g_config.game_name]})
        end
    end

    --游戏中
    m_STATE_HANDLE[STATE_ENUM.GAMEING] = function()
        --log.info("m_game_fd:", m_game_fd)
        if not m_game_fd then
            --去重启登录
            m_game_scene:clear()
            m_state = STATE_ENUM.UNLOGIN_HALL
        end
    end

    local function state_loop()
        local handle = m_STATE_HANDLE[m_state]
        assert(handle, "not exists handle = " .. m_state)
        handle()
    end
    local m_loop_timer = timer:new(timer.second * 5, 0, state_loop)   --5秒一次状态循环
    m_loop_timer:after_next()
end

local CMD = {}

function CMD.launch(idx)
    --log.info("launch >>> ", idx)
    create_one_robot_logic(idx)
end

function CMD.start(config)
    g_config = config
    game:init()
    return true
end

function CMD.exit()
    return true
end

return CMD