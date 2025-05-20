local log = require "skynet-fly.log"
local state_data = require "skynet-fly.hotfix.state_data"
local errorcode = require "common.enum.errorcode"

local next = next

local M = {}

local g_logic_info = state_data.alloc_table("g_logic_info")

function M.init(interface_mgr)
	g_logic_info.hall_interface = interface_mgr
end
-----------------------------其他逻辑---------------------------------

---------------------------客户端事件----------------------------------

---------------------------客户端消息处理-------------------------------
function M.do_join(player_id, pack_body)
	--log.info("JoinReq:",player_id,pack_body)
	if not pack_body.table_id then
		return false, errorcode.REQ_PARAM_ERR, "table_id is nil"
	end
	local old_table_id = g_logic_info.hall_interface:get_table_id(player_id)
	if old_table_id ~= '0:0' then			--已经在房间了
		return {table_id = old_table_id}
	end
	local ok,errorcode,errormsg = g_logic_info.hall_interface:join_table(player_id, "default", pack_body.table_id)
	if ok then
		return {table_id = ok}
	end
	return ok, errorcode, errormsg
end
---------------------------服务器传来的消息处理---------------------------

return M