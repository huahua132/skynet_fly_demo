local log = require "skynet-fly.log"
local GAME_ID_ENUM = require "common.enum.GAME_ID_ENUM"
local errorcode = require "common.enum.errorcode"
local game_redis = require "common.redis.game"
local match_msg = require "msg.match_msg"
local rpc_matchserver_match = require "common.rpc.matchserver.match"
local frpc_client = require "skynet-fly.client.frpc_client"
local state_data = require "skynet-fly.hotfix.state_data"

local next = next
local tonumber = tonumber

local g_local_info = state_data.alloc_table("g_local_info")
local g_matching_map = state_data.alloc_table("g_matching_map")

local M = {}

function M.init(interface_mgr)
    g_local_info.match_msg = match_msg:new(interface_mgr)
end
-----------------------------其他逻辑---------------------------------

--检查重连游戏
local function check_join_room_game(player_id)
    local game_room_info = game_redis.get_game_room_info(player_id)
    if not game_room_info or not next(game_room_info) then
        return
    end
    local cli = frpc_client:instance(game_room_info.svr_name, "room_game_alloc_m")
    cli:set_svr_id(game_room_info.svr_id)
    local ret = cli:byid_mod_call("exists", game_room_info.table_id, tonumber(game_room_info.create_time))

    if ret and #ret.result > 0 and ret.result[1] then 
        M.cmd_join_game(player_id, game_room_info.token, game_room_info.host, game_room_info.table_id)
    else
        --说明房间已经不存在了
        --删除房间信息
        game_redis.del_game_room_info(player_id)
    end
end

--检查取消匹配
local function check_cancel_matching(player_id)
    if not g_matching_map[player_id] then
        return
    end
    local game_server = g_matching_map[player_id]
    --log.info("check_cancel_matching >>> ", player_id)
    local ret, errcode, errmsg = rpc_matchserver_match.cancel_match(game_server, player_id)
    if not ret then
        log.warn("check_cancel_matching err ", errcode, errmsg)
    end
    g_matching_map[player_id] = nil
end

---------------------------客户端事件----------------------------------
--玩家登录
function M.on_login(player_id)
    check_join_room_game(player_id)
end

--玩家重连
function M.on_reconnect(player_id)
    check_join_room_game(player_id)
end

--玩家掉线
function M.on_disconnect(player_id)
    check_cancel_matching(player_id)
end

--玩家登出
function M.on_loginout(player_id)
    check_cancel_matching(player_id)
end

---------------------------客户端消息处理-------------------------------

--请求匹配
function M.do_match_game(player_id, pack_body)
    --log.info("do_match_game >>> ",player_id, pack_body)
    local game_id = pack_body.game_id
    local game_server = GAME_ID_ENUM[game_id]
    if not game_server then
        log.error("do_match_game not exists gameid ", game_id)
        return nil, errorcode.GAME_NOT_EXISTS, "GAME_NOT_EXISTS"
    end

    local game_room_info = game_redis.get_game_room_info(player_id)
    if game_room_info and next(game_room_info) then
        log.error("exists game_room_info ",player_id, game_room_info)
        return nil, errorcode.GAME_ROOM_EXISTS, "GAME_ROOM_EXISTS"
    end

    --匹配中
    if g_matching_map[player_id] then
        log.warn("do_match_game ", player_id)
        return nil, errorcode.MATCHING, "MATCHING"
    end
    --log.info("do_match_game2 >>> ",player_id, pack_body)
    local ret, errcode, errmsg = rpc_matchserver_match.match(game_server, player_id)
    if not ret then
        log.warn("do_match_game err ", errcode, errmsg)
        return ret, errcode, errmsg
    end
    --log.info("do_match_game3 >>> ",player_id, pack_body)
    --回复匹配
    g_local_info.match_msg:match_game_res(player_id, {game_id = game_id})

    g_matching_map[player_id] = game_server
    return true
end

--取消匹配
function M.do_cancel_match_game(player_id, pack_body)
    --log.info("do_cancel_match_game >>> ",player_id, pack_body)
    local game_id = pack_body.game_id
    local game_server = GAME_ID_ENUM[game_id]
    if not game_server then
        log.error("do_cancel_match_game not exists gameid ", game_id)
        return nil, errorcode.GAME_NOT_EXISTS, "GAME_NOT_EXISTS"
    end

    if not g_matching_map[player_id] then
        log.warn("do_cancel_match_game not matching ", player_id)
        return nil, errorcode.NOT_MATCHING, "NOT_MATCHING"
    end

    local ret, errcode, errmsg = rpc_matchserver_match.cancel_match(game_server, player_id)
    if not ret then
        log.warn("do_cancel_match_game err ", errcode, errmsg)
        return ret, errcode, errmsg
    end

    --回复取消匹配
    g_local_info.match_msg:cancel_match_game_res(player_id, {game_id = game_id})
    g_matching_map[player_id] = nil
    return true
end

--接受对局
function M.do_accept_match(player_id, pack_body)
    --log.info("do_accept_match >>> ", player_id, pack_body)
    local game_id = pack_body.game_id
    local game_server = GAME_ID_ENUM[game_id]
    if not game_server then
        log.error("do_cancel_match_game not exists gameid ", game_id)
        return nil, errorcode.GAME_NOT_EXISTS, "GAME_NOT_EXISTS"
    end

    local session_id = pack_body.session_id
    if not rpc_matchserver_match.accept_session(game_server, player_id, session_id) then
        return nil
    end

    --回复接受对局
    g_local_info.match_msg:accept_match_res(player_id, {game_id = game_id, session_id = session_id})

    return true
end

---------------------------服务器传来的消息处理---------------------------
--匹配成功
function M.cmd_match_succ(player_id, session_id, game_id, remain_time)
    --log.info("cmd_match_succ >>> ",player_id, session_id, game_id, remain_time)
    --通知匹配成功
    g_matching_map[player_id] = nil
    g_local_info.match_msg:match_game_notice(player_id, {game_id = game_id, session_id = session_id, remain_time = remain_time})
end

--加入对局
function M.cmd_join_game(player_id, token, host, table_id)
    --log.info("cmd_join_game >>>>> ", player_id, token, host, table_id)
    --通知加入对局
    g_local_info.match_msg:join_game_notice(player_id, {
        gamehost = host, 
        gametoken = token,
        table_id = table_id
    })
end

return M