local frpc_client = require "skynet-fly.client.frpc_client"

local table = table

local M = {}

--匹配
function M.match(game_server, player_id)
    local ret = frpc_client:instance("matchserver", "match_m", game_server):one_balance_call_by_name("match", player_id)
    if not ret then return end
    
    return table.unpack(ret.result)
end

--取消匹配
function M.cancel_match(game_server, player_id)
    local ret = frpc_client:instance("matchserver", "match_m", game_server):one_balance_call_by_name("cancel_match", player_id)
    if not ret then return end
    
    return table.unpack(ret.result)
end

--接受对局
function M.accept_session(game_server, player_id, session_id)
    local ret = frpc_client:instance("matchserver", "match_m", game_server):one_balance_call_by_name("accept_session", player_id, session_id)
    if not ret then return end

    return table.unpack(ret.result)
end

return M