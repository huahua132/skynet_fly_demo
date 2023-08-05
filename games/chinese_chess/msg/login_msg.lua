local ws_pbnet_util = require "ws_pbnet_util"

local M = {}

function M.login_res(gate,fd,msgbody)
	ws_pbnet_util.send(gate,fd,".chinese_chess_login.LoginRes",msgbody)
end

return M