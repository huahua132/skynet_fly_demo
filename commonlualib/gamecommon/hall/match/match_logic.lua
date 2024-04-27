local log = require "skynet-fly.log"
local hall_msg = require "gamecommon.msg.hall_msg"

local next = next

local M = {}

local g_interface_mgr = nil

function M.init(interface_mgr)
    g_interface_mgr = interface_mgr
    hall_msg = hall_msg:new(interface_mgr)
end
-----------------------------其他逻辑---------------------------------

---------------------------客户端事件----------------------------------

---------------------------客户端消息处理-------------------------------
function M.do_join(player_id, pack_body)
	--log.info("JoinReq:",player_id,pack_body)
	local ok,errorcode,errormsg = g_interface_mgr:join_table(player_id, "default", pack_body.table_id)
	if ok then
		hall_msg:join_res(player_id,{table_id = errorcode})
	end
	return ok,errorcode,errormsg
end
---------------------------服务器传来的消息处理---------------------------

return M