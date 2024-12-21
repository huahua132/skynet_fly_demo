local log = require "skynet-fly.log"
local errorcode = require "common.enum.errorcode"
local GAME_STATE = require "enum.GAME_STATE"
local skynet = require "skynet"
local contriner_client = require "skynet-fly.client.contriner_client"
local ENUM = require "common.enum.ENUM"
local cfg = require "skynet-fly.etc.module_info".get_cfg()
local game_redis = require "common.redis.game"
local watch_server = require "skynet-fly.rpc.watch_server"
local SYN_CHANNEL_NAME = require "common.enum.SYN_CHANNEL_NAME"
local timer = require "skynet-fly.timer"

contriner_client:register("share_config_m", "token_m")

local table = table
local ipairs = ipairs
local assert = assert
local next = next
local os = os
local pairs = pairs

local g_alloc_interface = nil
local g_timer_obj = nil

local g_info = {
	max_table_num = cfg.MAX_TABLES,
	cur_table_num = 0,
	cur_player_num = 0,
	host = "",
}

local g_isneed_pub = true

local function syn_alloc_info()
	if g_isneed_pub then
		g_isneed_pub = false
		watch_server.pubsyn(SYN_CHANNEL_NAME.alloc_info, g_info)
	end
end

local g_table_info = {}

local M = {}

local CMD = {}

--是否存在桌子
function CMD.exists(table_id, create_time)
	if not g_table_info[table_id] then
		return false
	end

	local t_info = g_table_info[table_id]
	if t_info.create_time ~= create_time then
		return false
	else
		return true
	end
end

--创建桌子
function CMD.createtable(player_list, create_time, play_type)
	local table_id = g_alloc_interface.create_table("default", play_type)
	if not table_id then
		return nil
	end
	g_table_info[table_id] = {
		player_list = player_list,
		create_time = create_time,
	}
	--创建token
	local token_list = contriner_client:instance("token_m"):mod_call("create_token", player_list, ENUM.LOGIN_TOKEN_TIME_OUT)
	return table_id, token_list
end

--设置玩家房间信息
function CMD.set_game_room_info(game_info_map)
	--log.info("set_game_room_info >>> ",game_info_map)
	for player_id, game_room_info in pairs(game_info_map) do
		game_redis.set_game_room_info(player_id, game_room_info)
	end

	return true
end

M.register_cmd = CMD

function M.init(alloc_interface) --初始化
	g_alloc_interface = alloc_interface
	skynet.fork(function()
		local confclient = contriner_client:new("share_config_m")
        local room_game_login = confclient:mod_call('query','room_game_login')
        g_info.host = room_game_login.wsgateconf.host
	end)

	g_timer_obj = timer:new(timer.second * 5, timer.loop, syn_alloc_info)
end

function M.fix_exit()
	g_timer_obj:cancel()
end

function M.match(player_id) --匹配
	assert(1 == 2)
end

function M.createtable(table_name, table_id, config, create_player_id) --创建桌子
	--log.info("createtable:",table_id)
	g_info.cur_table_num = g_info.cur_table_num + 1
	g_isneed_pub = true
end

function M.entertable(table_id,player_id)  --进入桌子
	--log.info("entertable:",table_id,player_id)
	g_info.cur_player_num = g_info.cur_player_num + 1
	g_isneed_pub = true
end

function M.leavetable(table_id,player_id)  --离开桌子
	--log.info("leavetable:",table_id,player_id)
	g_info.cur_player_num = g_info.cur_player_num - 1
	game_redis.del_game_room_info(player_id)
	g_isneed_pub = true
end

function M.dismisstable(table_id) --解散桌子
	--log.info("dismisstable:",table_id)
	g_info.cur_table_num = g_info.cur_table_num - 1

	local t_info = assert(g_table_info[table_id])
	local player_list = t_info.player_list
	for _,player_id in ipairs(player_list) do
		game_redis.del_game_room_info(player_id)
	end

	g_table_info[table_id] = nil
	g_isneed_pub = true
end

function M.tablefull()
	return nil,errorcode.TABLE_FULL,"table full"
end

function M.table_not_exists()
	return nil,errorcode.TABLE_NOT_EXISTS,"not table"
end

return M