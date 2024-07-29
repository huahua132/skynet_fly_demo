local log = require "skynet-fly.log"
local hall_msg = require "gamecommon.msg.hall_msg"
local state_data = require "skynet-fly.hotfix.state_data"

local next = next

local M = {}

local g_logic_info = state_data.alloc_table("g_logic_info")

function M.init(interface_mgr)
	g_logic_info.hall_interface = interface_mgr
	g_logic_info.hall_msg = hall_msg:new(interface_mgr)
end
-----------------------------其他逻辑---------------------------------

---------------------------客户端事件----------------------------------

---------------------------客户端消息处理-------------------------------
function M.do_join(player_id, pack_body)
	--log.info("JoinReq:",player_id,pack_body)
	local ok,errorcode,errormsg = g_logic_info.hall_interface:join_table(player_id, "default", pack_body.table_id)
	if ok then
		g_logic_info.hall_msg:join_res(player_id,{table_id = errorcode})
	end
	return ok,errorcode,errormsg
end
---------------------------服务器传来的消息处理---------------------------

return M