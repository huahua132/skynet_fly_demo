local log = require "log"

local pairs = pairs
local table = table
local ipairs = ipairs
local assert = assert
local next = next

local g_table_map = {}
local MAX_PLAYER_NUM = 2

local M = {}

--初始化
function M.init()

end

--匹配
function M.match(player_id)
	log.info("match:",player_id)
	local table_num_map = {}

	--简单按照桌子人数整理一下
	for table_id,t_info in pairs(g_table_map) do
		local player_num = #t_info.player_list
		if not table_num_map[player_num] then
			table_num_map[player_num] = {}
		end
		table.insert(table_num_map[player_num],t_info)
	end

	--安人数从多到少去匹配
	for i = MAX_PLAYER_NUM - 1,0,-1 do
		local t_list = table_num_map[i]
		if t_list then
			for _,t_info in ipairs(t_list) do
				--匹配到了
				return t_info.table_id
			end
		end
	end

	--没有匹配到
	return nil
end

--创建桌子
function M.createtable(table_id) 
	--没有匹配到会尝试创建桌子，到这来说明桌子创建成功了
	log.info("createtable:",table_id)
	assert(not g_table_map[table_id],"repeat table_id")
	g_table_map[table_id] = {
		table_id = table_id,
		player_list = {}
	}
end

--进入桌子
function M.entertable(table_id,player_id)
	--玩家进入桌子
	log.info("entertable:",table_id,player_id)
	assert(g_table_map[table_id],"table not exists")

	local t_info = g_table_map[table_id]
	local player_list = t_info.player_list

	for i = 1,#player_list do
		local pid = player_list[i]
		if pid == player_id then
			log.error("entertable player exists ",table_id,player_id)
			return
		end
	end

	table.insert(t_info.player_list,player_id)
end

--离开桌子
function M.leavetable(table_id,player_id)
	--玩家离开桌子
	log.info("leavetable:",table_id,player_id)
	assert(g_table_map[table_id],"table not exists")

	local t_info = g_table_map[table_id]
	local player_list = t_info.player_list

	for i = #player_list,1,-1 do
		local pid = player_list[i]
		if pid == player_id then
			table.remove(player_list,i)
			return
		end
	end

	log.error("leavetable player not exists ",table_id,player_id) 
end

--解散桌子
function M.dismisstable(table_id) 
	--桌子解散了，最后一个人离开桌子后会解散桌子
	log.info("dismisstable:",table_id)
	assert(g_table_map[table_id],"table not exists")

	local t_info = g_table_map[table_id]
	local player_list = t_info.player_list

	assert(not next(player_list),"dismisstable exists player " .. #player_list)

	g_table_map[table_id] = nil
end

--桌子已满
function M.tablefull()
	--桌子满了，这里可以返回错误码可错误信息
end

return M