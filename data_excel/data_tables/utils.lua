local assert = assert
local type = type
local pairs = pairs

local M = {}

--[[
	函数作用域：M 的成员函数
	函数名称: check_def_table
	描述: 检测2张表有什么同
		共有4种不同
		类型不同：typedef
		相对于old_t有新增: add
		相对于old_t有删除: reduce
		值不同：valuedef
	参数:
		- new_t (table): 新表
		- old_t (table): 旧表
]]
function M.check_def_table(new_t,old_t)
	assert(type(new_t) == 'table' and type(old_t) == 'table')

	local function check_func(nt,ot)
		local des_map = {}
		local n_type = type(nt)
		local o_type = type(ot)
		if n_type ~= o_type then
			return {_flag = "typedef",_new = nt,_old = ot}
		else
			if n_type == 'table' then
				for k,v in pairs(nt) do
					if ot[k] == nil then
						des_map[k] = {_flag = "add",_new = v,_old = nil}
					end
				end
	
				for k,v in pairs(ot) do
					if nt[k] == nil then
						des_map[k] = {_flag = "reduce",_new = nil,_old = v}
					end
				end
	
				for k,v in pairs(nt) do
					if not des_map[k] then
						local temp_des_map = check_func(nt[k],ot[k])
						if next(temp_des_map) then
							des_map[k] = temp_des_map
						end
					end
				end
			else
				if nt ~= ot then
					return {_flag = "valuedef",_new = nt,_old = ot}
				end
			end
		end
		return des_map
	end

	return check_func(new_t,old_t)
end

return M