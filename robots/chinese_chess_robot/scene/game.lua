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
	game_pack.load('../../commonlualib/protos/chinese_chess')

	--协议码 协议消息名建立映射关系
	game_helper.set_pack_id_names {
		"../../commonlualib/packids/gamecommon/",
		"../../commonlualib/packids/common/",
		"../../commonlualib/packids/chinese_chess/",
	}
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
    send_msg(PACK.login.LoginReq, login_req)
end

--消息处理
function M:on_handle(pack_id, packbody)
    local HANDLE_FUNC = {}
     --游戏服登录成功
     HANDLE_FUNC[PACK.login.LoginRes] = function(body)
        --发送心跳包
        if self.m_heart_timer then
            self.m_heart_timer:cancel()
        end

        local heart_req = {
            time = nil
        }
        self.m_heart_timer = timer:new(timer.second * 5, 0, function()
            heart_req.time = time_util.time()
            self.m_send_msg(PACK.game_hall.HeartReq, heart_req)
        end)

        if body.isreconnect == 1 then   --如果是重连
            --请求游戏状态
            self.m_send_msg(PACK.chinese_chess_game.gameStateReq, {
                player_id = self.m_player_id
            })
        else                            --首次进入
            --请求进入桌子
            self.m_send_msg(PACK.game_hall.JoinReq, {
                table_id = self.m_table_id
            })
        end
    end

    --进入桌子成功
    HANDLE_FUNC[PACK.game_hall.JoinRes] = function()
        --请求游戏状态
        self.m_send_msg(PACK.chinese_chess_game.gameStateReq, {
            player_id = self.m_player_id
        })
    end

    --游戏状态数据
    HANDLE_FUNC[PACK.chinese_chess_game.gameStateRes] = function(body)
        self.m_game_data = body
        self:check_doing()
    end

    --通知操作
    HANDLE_FUNC[PACK.chinese_chess_game.nextDoing] = function(body)
        if not self.m_game_data then
            return
        end
        self.m_game_data.next_doing = body
        self:check_doing()
    end

    --棋子移动
    HANDLE_FUNC[PACK.chinese_chess_game.moveRes] = function(body)
        --log.info("move chess >>", body)
    end

    local handle = HANDLE_FUNC[pack_id]
    if not handle then
        --log.error("drop game pack_id = ", pack_id)
    else
        handle(packbody)
    end
end

--操作
function M:doing()
    if not self.m_game_data then return end
    local next_doing = self.m_game_data.next_doing
    local can_move_list = next_doing.can_move_list
    if not can_move_list then return end

    --先随机走一步  后续看能不能弄个智能的象棋AI
    local index = math.random(1, #can_move_list)
    local one_can_move = can_move_list[index]
    local chess_id = one_can_move.chess_id
    local row_list = one_can_move.row_list
    local col_list = one_can_move.col_list

    local pos_index = math.random(1, #row_list)
    local row = row_list[pos_index]
    local col = col_list[pos_index]

    --log.info("doing:", one_can_move, pos_index, row, col)
    self.m_send_msg(PACK.chinese_chess_game.moveReq, {
        chess_id = chess_id,
        move_row = row,
        move_col = col,
    })
end

-- 检查是否需要操作
function M:check_doing()
    if not self.m_game_data then return end
    
    local next_doing = self.m_game_data.next_doing
    if next_doing.player_id == self.m_player_id then
        local remain_once_time = next_doing.remain_once_time
        local left = timer.second
        local right = timer.second * 10
        if right > remain_once_time and remain_once_time >= left then
            right = remain_once_time
        end
        if self.m_doing_timer then
            self.m_doing_timer:cancel()
        end
        local time = math.random(left, right)
        --log.info("check_doing >>>> ", time)
        self.m_doing_timer = timer:new(time, 1, self.doing, self)
    end
end

return M