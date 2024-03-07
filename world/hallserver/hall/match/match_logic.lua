local log = require "skynet-fly.log"
local GAME_ID_ENUM = require "common.enum.GAME_ID_ENUM"
local cluster_client = require "skynet-fly.client.cluster_client"
local errorcode = require "common.enum.errorcode"
local hall_global = require "hall.hall_global"

local M = {}

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

---------------------------服务器传来的消息处理---------------------------
--匹配成功
function M.do_match_succ(player_id, session_id, game_id, remain_time)
    log.info("do_match_succ >>> ",player_id, session_id, game_id, remain_time)
    --通知匹配成功
    hall_global.get_hall_msg():match_game_notice(player_id, {game_id = game_id, session_id = session_id, remain_time = remain_time})
end

return M