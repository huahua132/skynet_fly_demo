local log = require "skynet-fly.log"
local GAME_ID_ENUM = require "common.enum.GAME_ID_ENUM"
local cluster_client = require "skynet-fly.client.cluster_client"
local errorcode = require "common.enum.errorcode"
local hall_global = require "hall.hall_global"
local game_redis = require "common.redis.game"

local next = next

local M = {}

-----------------------------其他逻辑---------------------------------
local function check_join_room_game(player_id)
    local game_room_info = game_redis.get_game_room_info(player_id)
    log.info("check_join_room_game >>>>>> ", player_id, game_room_info)
    if not game_room_info or not next(game_room_info) then
        return
    end

    M.cmd_join_game(game_room_info.token, game_room_info.host, game_room_info.table_id)
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

---------------------------客户端消息处理-------------------------------

--请求匹配
function M.do_match_game(player_id, pack_body)
    log.info("do_match_game >>> ",player_id, pack_body)
    local game_id = pack_body.game_id
    local game_server = GAME_ID_ENUM[game_id]
    if not game_server then
        log.error("do_match_game not exists gameid ", game_id)
        return nil, errorcode.GAME_NOT_EXISTS, "GAME_NOT_EXISTS"
    end

    local game_room_info = game_redis.get_game_room_info(player_id)
    if game_room_info and next(game_room_info) then
        log.error("exists game_room_info ",player_id, game_room_info)
        return 
    end

    log.info("do_match_game2 >>> ",player_id, pack_body)
    if not cluster_client:instance("matchserver", "match_m", game_server):one_balance_call("match", player_id) then
        return nil
    end
    log.info("do_match_game3 >>> ",player_id, pack_body)
    --回复匹配
    hall_global.get_hall_msg():match_game_res(player_id, {game_id = game_id})

    return true
end

--取消匹配
function M.do_cancel_match_game(player_id, pack_body)
    log.info("do_cancel_match_game >>> ",player_id, pack_body)
    local game_id = pack_body.game_id
    local game_server = GAME_ID_ENUM[game_id]
    if not game_server then
        log.error("do_cancel_match_game not exists gameid ", game_id)
        return nil, errorcode.GAME_NOT_EXISTS, "GAME_NOT_EXISTS"
    end

    if not cluster_client:instance("matchserver", "match_m", game_server):one_balance_call("cancel_match", player_id) then
        return nil
    end

    --回复取消匹配
    hall_global.get_hall_msg():cancel_match_game_res(player_id, {game_id = game_id})

    return true
end

--接受对局
function M.do_accept_match(player_id, pack_body)
    log.info("do_accept_match >>> ", player_id, pack_body)
    local game_id = pack_body.game_id
    local game_server = GAME_ID_ENUM[game_id]
    if not game_server then
        log.error("do_cancel_match_game not exists gameid ", game_id)
        return nil, errorcode.GAME_NOT_EXISTS, "GAME_NOT_EXISTS"
    end

    local session_id = pack_body.session_id
    if not cluster_client:instance("matchserver", "match_m", game_server):one_balance_call("accept_session", player_id, session_id) then
        return nil
    end

    --回复接受对局
    hall_global.get_hall_msg():accept_match_res(player_id, {game_id = game_id, session_id = session_id})

    return true
end

---------------------------服务器传来的消息处理---------------------------
--匹配成功
function M.cmd_match_succ(player_id, session_id, game_id, remain_time)
    log.info("cmd_match_succ >>> ",player_id, session_id, game_id, remain_time)
    --通知匹配成功
    hall_global.get_hall_msg():match_game_notice(player_id, {game_id = game_id, session_id = session_id, remain_time = remain_time})
end

--加入对局
function M.cmd_join_game(player_id, token, host, table_id)
    log.info("cmd_join_game >>>>> ", player_id, token, host, table_id)
    --通知加入对局
    hall_global:get_hall_msg():join_game_notice(player_id, {
        gamehost = host, 
        gametoken = token,
        table_id = table_id
    })
end

return M