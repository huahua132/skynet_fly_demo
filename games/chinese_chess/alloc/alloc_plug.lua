local log = require "skynet-fly.log"
local errorcode = require "common.enum.errorcode"
local GAME_STATE = require "enum.GAME_STATE"
local skynet = require "skynet"
local contriner_client = require "skynet-fly.client.contriner_client"
local cfg = require "skynet-fly.etc.module_info".get_cfg()
local ENUM = require "enum.ENUM"
local game_redis = require "common.redis.game"

contriner_client:register("share_config_m", "token_m")

local pairs = pairs
local table = table
local ipairs = ipairs
local assert = assert
local next = next

local g_alloc_interface = nil

local g_info = {
	max_table_num = cfg.MAX_TABLES,
	cur_table_num = 0,
	cur_player_num = 0,
	host = "",
}

local g_table_info = {}

local M = {}

local CMD = {}

--销毁桌子
function CMD.dismisstable(table_id)
	g_alloc_interface.dismisstable(table_id)
end

--获取信息
function CMD.get_info()
	return g_info
end

--创建桌子
function CMD.createtable(player_list)
	local table_id = g_alloc_interface.create_table("default")
	if not table_id then
		return nil
	end
	g_table_info[table_id] = player_list
	--创建token
	local token_list = contriner_client:instance("token_m"):mod_call("create_token", player_list, ENUM.TOKEN_TIME_OUT)
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
        g_info.host = room_game_login.gateconf.host
	end)
end

function M.match(player_id) --匹配
	assert(1 == 2)
end

function M.createtable(table_name, table_id, config, create_player_id) --创建桌子
	--log.info("createtable:",table_id)
	g_info.cur_table_num = g_info.cur_table_num + 1
end

function M.entertable(table_id,player_id)  --进入桌子
	--log.info("entertable:",table_id,player_id)
	g_info.cur_player_num = g_info.cur_player_num + 1
end

function M.leavetable(table_id,player_id)  --离开桌子
	--log.info("leavetable:",table_id,player_id)
	g_info.cur_player_num = g_info.cur_player_num - 1
end

function M.dismisstable(table_id) --解散桌子
	--log.info("dismisstable:",table_id)
	g_info.cur_table_num = g_info.cur_table_num - 1

	local player_list = assert(g_table_info[table_id])
	for _,player_id in ipairs(player_list) do
		game_redis.del_game_room_info(player_id)
	end
end

function M.tablefull()
	return nil,errorcode.TABLE_FULL,"table full"
end

function M.table_not_exists()
	return nil,errorcode.TABLE_NOT_EXISTS,"not table"
end

return M