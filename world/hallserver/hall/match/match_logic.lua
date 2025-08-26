local log = require "skynet-fly.log"
local GAME_ID_ENUM = hotfix_require "common.enum.GAME_ID_ENUM"
local errorcode = hotfix_require "common.enum.errorcode"
local game_redis = hotfix_require "common.redis.game"
local match_msg = hotfix_require "msg.match_msg"
local rpc_matchserver_match = hotfix_require "common.rpc.matchserver.match"
local frpc_client = require "skynet-fly.client.frpc_client"
local state_data = require "skynet-fly.hotfix.state_data"
local match_conf = hotfix_require "common.conf.match_conf"

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
    local cli = frpc_client:instance(frpc_client.FRPC_MODE.byid, game_room_info.svr_name, "room_game_alloc_m")
    cli:set_svr_id(game_room_info.svr_id)
    local ret = cli:mod_call("exists", game_room_info.table_id, tonumber(game_room_info.create_time))

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
    local match_info = g_matching_map[player_id]
    local game_type = match_info.game_type
    local play_type = match_info.play_type
    local game_server = GAME_ID_ENUM[game_type]
    --log.info("check_cancel_matching >>> ", player_id)
    local ret, errcode, errmsg = rpc_matchserver_match.cancel_match(game_server, player_id, play_type)
    if not ret then
        log.warn("check_cancel_matching err ", errcode, errmsg)
    end
    g_matching_map[player_id] = nil
end

---------------------------客户端事件----------------------------------
--玩家登录
function M.on_login(player_id, is_jump_join)
    --log.info("on_login >>> ", player_id, is_jump_join)
    if is_jump_join then return end
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
function M.on_loginout(player_id, is_jump_exit)
    --log.info("on_loginout >>> ", player_id, is_jump_exit)
    if is_jump_exit then return end
    check_cancel_matching(player_id)
end

---------------------------客户端消息处理-------------------------------

--请求匹配
function M.do_match_game(player_id, pack_body)
    --log.info("do_match_game >>> ",player_id, pack_body)
    local game_id = pack_body.game_id or 0
    local play_type = pack_body.play_type or 0
    local game_server = GAME_ID_ENUM[game_id]
    if not game_server then
        log.warn("do_match_game not exists gameid ", game_id)
        return nil, errorcode.GAME_NOT_EXISTS, "GAME_NOT_EXISTS"
    end

    local cfg = match_conf.get_cfg(game_id, play_type)
    if not cfg then
        log.warn("do_match_game not exists playtype ", game_id, play_type)
        return nil, errorcode.GAME_NOT_EXISTS, "PLAY_TYPE NOT EXISTS"
    end

    local game_room_info = game_redis.get_game_room_info(player_id)
    if game_room_info and next(game_room_info) then
        log.error("exists game_room_info ",player_id, game_room_info)
        return nil, errorcode.GAME_ROOM_EXISTS, "GAME_ROOM_EXISTS"
    end

    --匹配中
    if g_matching_map[player_id] then
        return nil, errorcode.MATCHING, "MATCHING"
    end
    --log.info("do_match_game2 >>> ",player_id, pack_body)
    local ret, errcode, errmsg = rpc_matchserver_match.match(game_server, player_id, play_type)
    if not ret then
        log.warn("do_match_game err ", errcode, errmsg)
        return ret, errcode, errmsg
    end
    --log.info("do_match_game3 >>> ",player_id, pack_body)

    g_matching_map[player_id] = {
        game_type = game_id,
        play_type = play_type,
    }

    --回复匹配
    return {
        game_id = game_id
    }
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
    local play_type = g_matching_map[player_id].play_type
    local ret, errcode, errmsg = rpc_matchserver_match.cancel_match(game_server, player_id, play_type)
    if not ret then
        log.warn("do_cancel_match_game err ", errcode, errmsg)
        return ret, errcode, errmsg
    end

    g_matching_map[player_id] = nil

    --回复取消匹配
    return {
        game_id = game_id
    }
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
    return {
        game_id = game_id,
        session_id = session_id,
    }
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