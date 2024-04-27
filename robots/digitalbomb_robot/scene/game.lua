--象棋游戏场景
local log = require "skynet-fly.log"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local timer = require "skynet-fly.timer"
local time_util = require "skynet-fly.utils.time_util"

local setmetatable = setmetatable
local math = math

local M = {}
local mt = {__index = M}

--初始化
function M:init()
    pb_netpack.load('../../games/digitalbomb/proto')
end

--新建
function M:new()
    local t = {
        m_player_id = nil,
        m_table_id = nil,
        m_send_msg = nil,
        m_heart_timer = nil,          --心跳包定时器
        m_doing_timer = nil,          --操作定时器
        m_game_data = nil,            --游戏数据
    }
    setmetatable(t, mt)
    return t
end

--清理数据
function M:clear()
    self.m_table_id = nil
    self.m_send_msg = nil
    if self.m_doing_timer then
        self.m_doing_timer:cancel()
    end
    if self.m_heart_timer then
        self.m_heart_timer:cancel()
    end
    self.m_heart_timer = nil
end

--建立连接
function M:on_connect(player_id, table_id, token, send_msg)
    self:clear()
    self.m_player_id = player_id
    self.m_table_id = table_id
    self.m_send_msg = send_msg
    --请求登录
    local login_req = {
        token = token,
        player_id = player_id,
    }
    send_msg('.game_login.LoginReq', login_req)
end

--消息处理
function M:on_handle(packname, packbody)
    local HANDLE_FUNC = {}
     --游戏服登录成功
     HANDLE_FUNC['.game_login.LoginRes'] = function(body)
        --发送心跳包
        if self.m_heart_timer then
            self.m_heart_timer:cancel()
        end

        local heart_req = {
            time = nil
        }
        self.m_heart_timer = timer:new(timer.second * 5, 0, function()
            heart_req.time = time_util.time()
            self.m_send_msg('.game_hall.HeartReq', heart_req)
        end)

        if body.isreconnect == 1 then   --如果是重连
            --请求游戏状态
            self.m_send_msg('.digitalbomb_game.GameStatusReq', {
                player_id = self.m_player_id
            })
        else                            --首次进入
            --请求进入桌子
            self.m_send_msg('.game_hall.JoinReq', {
                table_id = self.m_table_id
            })
        end
    end

    --进入桌子成功
    HANDLE_FUNC['.game_hall.JoinRes'] = function()
        --请求游戏状态
        self.m_send_msg('.digitalbomb_game.GameStatusReq', {
            player_id = self.m_player_id
        })
    end

    --游戏状态数据
    HANDLE_FUNC['.digitalbomb_game.GameStatusRes'] = function(body)
        self.m_game_data = body
        self:check_doing()
    end

    --通知操作
    HANDLE_FUNC['.digitalbomb_game.NextDoingCast'] = function(body)
        if not self.m_game_data then
            return
        end
        self.m_game_data.next_doing = body
        self:check_doing()
    end

    local handle = HANDLE_FUNC[packname]
    if not handle then
        --log.error("drop game packname = ", packname)
    else
        handle(packbody)
    end
end

--操作
function M:doing()
    if not self.m_game_data then return end
    local next_doing = self.m_game_data.next_doing
    local min_num = next_doing.min_num
    local max_num = next_doing.max_num

    local opt_num = math.random(min_num, max_num)

    --log.info("doing:", one_can_move, pos_index, row, col)
    self.m_send_msg('.digitalbomb_game.DoingReq', {
        opt_num = opt_num
    })
end

-- 检查是否需要操作
function M:check_doing()
    if not self.m_game_data then return end

    local next_doing = self.m_game_data.next_doing
    if next_doing.doing_player_id == self.m_player_id then
        local left = timer.second
        local right = timer.second * 5
        
        local time = math.random(left, right)
        --log.info("check_doing >>>> ", time)
        self.m_doing_timer = timer:new(time, 1, self.doing, self)
    end
end

return M