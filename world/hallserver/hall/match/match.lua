
local match_logic = hotfix_require "hall.match.match_logic"


local M = {}

function M.init(interface_mgr)
    match_logic.init(interface_mgr)
end

function M.on_login(player_id)
    match_logic.on_login(player_id)
end

function M.on_reconnect(player_id)
    match_logic.on_reconnect(player_id)
end

function M.on_disconnect(player_id)
    match_logic.on_disconnect(player_id)
end

function M.on_loginout(player_id)
    match_logic.on_loginout(player_id)
end

M.handle = {
    --匹配
    ['.hallserver_match.MatchGameReq'] = function(player_id, packname, pack_body)
       return match_logic.do_match_game(player_id, pack_body)
    end,
    --取消匹配
    ['.hallserver_match.CancelMatchGameReq'] = function(player_id, packname, pack_body)
        return match_logic.do_cancel_match_game(player_id, pack_body)
    end,
    --接受对局
    ['.hallserver_match.AcceptMatchReq'] = function(player_id, packname, pack_body)
        return match_logic.do_accept_match(player_id, pack_body)
    end,
}

local CMD = {}

--匹配成功
function CMD.match_succ(...)
   return match_logic.cmd_match_succ(...)
end

--加入对局
function CMD.match_join_game(...)
    return match_logic.cmd_join_game(...)
end

M.register_cmd = CMD

return M