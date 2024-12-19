--象棋游戏场景
local log = require "skynet-fly.log"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local timer = require "skynet-fly.timer"
local time_util = require "skynet-fly.utils.time_util"
local pack_helper = require "common.pack_helper"


local game_pack = pb_netpack.instance("game")
local game_helper = pack_helper.instance("game", game_pack)
do
    game_pack.load('../../commonlualib/protos/gamecommon')
	game_pack.load('../../commonlualib/protos/common')
	game_pack.load('../../commonlualib/protos/digitalbomb')

	--协议码 协议消息名建立映射关系
	game_helper.set_pack_id_names()
end

local PACK = game_helper.PACK

local setmetatable = setmetatable
local math = math

local M = {}
local mt = {__index = M}

--初始化
function M:init()
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
function M:on_connect(player_id, table_id, token, game_rpc)
    self:clear()
    self.m_player_id = player_id
    self.m_table_id = table_id
    self.m_game_rpc = game_rpc
    --请求登录
    local login_req = {
        token = token,
        player_id = player_id,
    }
    local packid, packbody = game_rpc:req(PACK.login.LoginReq, login_req)
    if not packid or packid == PACK.errors.Error then
        log.warn("登录游戏服失败 >>>", self.m_player_id, packid, packbody)
        return false
    else
        --发送心跳包
        if self.m_heart_timer then
            self.m_heart_timer:cancel()
        end

        local heart_req = {
            time = nil
        }
        self.m_heart_timer = timer:new(timer.second * 5, 0, function()
            heart_req.time = time_util.time()
            local packid = game_rpc:req(PACK.login.HeartReq, heart_req)
            if not packid or packid == PACK.errors.Error then
                if self.m_heart_timer then
                    self.m_heart_timer:cancel()
                    self.m_heart_timer = nil
                end
            end
        end)

        if packbody.isreconnect == 1 then   --如果是重连
            M:req_game_state()
        else                            --首次进入
            --请求进入桌子
            local packid, packbody = game_rpc:req(PACK.game_hall.JoinReq, {
                table_id = self.m_table_id
            })
            if not packid or packid == PACK.errors.Error then
                log.warn("请求进入桌子 失败 >>> ", self.m_player_id, packid, packbody)
            else
                self:req_game_state()
            end
        end
    end
    return true
end

--消息处理
function M:on_handle(pack_id, packbody)
    local HANDLE_FUNC = {}
    --通知操作
    HANDLE_FUNC[PACK.digitalbomb_game.NextDoingCast] = function(body)
        if not self.m_game_data then
            return
        end
        self.m_game_data.next_doing = body
        self:check_doing()
    end

    local handle = HANDLE_FUNC[pack_id]
    if not handle then
        --log.error("drop game pack_id = ", pack_id)
    else
        handle(packbody)
    end
end

--请求游戏状态
function M:req_game_state()
    local packid, packbody = self.m_game_rpc:req(PACK.digitalbomb_game.GameStatusReq, {
        player_id = self.m_player_id
    })
    if not packid or packid == PACK.errors.Error then
        --log.warn("请求游戏状态 >>> ", packid, packbody)
    else
        self.m_game_data = packbody
        self:check_doing()
    end
end

--操作
function M:doing()
    if not self.m_send_msg then return end
    if not self.m_game_data then return end
    local next_doing = self.m_game_data.next_doing
    local min_num = next_doing.min_num
    local max_num = next_doing.max_num

    local opt_num = math.random(min_num, max_num)

    self.m_send_msg(PACK.digitalbomb_game.DoingReq, {
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