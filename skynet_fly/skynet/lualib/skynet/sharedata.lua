local skynet = require "skynet"
local sd = require "skynet.sharedata.corelib"

local service

skynet.init(function()
	service = skynet.uniqueservice "sharedatad"
end)

local sharedata = {}
local cache = setmetatable({}, { __mode = "kv"})
local cobjcache = {}

function sharedata.query(name)
	if cache[name] then
		return cache[name]
	end
	local obj = skynet.call(service, "lua", "query", name)
	if cache[name] and cache[name].__obj == obj then
		skynet.send(service, "lua", "confirm" , obj)
		return cache[name]
	end
	local r = nil
	if not skynet.is_record_handle() then
		r = sd.box(obj)
	else
		local f, err = loadfile(name)
		if not f then
			skynet.error("query err ", name, err)
		end
		assert(f, "query can`t loadfile ")
		r = f()
	end
	skynet.send(service, "lua", "confirm" , obj)
	cache[name] = r
	cobjcache[name] = obj
	return r
end

function sharedata.update_cobj(name)
	if not cache[name] then return end
	local pre_cobj = cobjcache[name]
	local newobj = skynet.call(service, "lua", "monitor", name, pre_cobj)
	if newobj == nil then
		return
	end

	cobjcache[name] = newobj
	skynet.send(service, "lua", "confirm" , newobj)
end

function sharedata.switch_new(name)
	if not cache[name] then return end
	local obj = cache[name]
	local cobj = cobjcache[name]
	if not skynet.is_record_handle() then
		sd.update(obj, cobj)
	end
end

function sharedata.new(name, v, ...)
	skynet.call(service, "lua", "new", name, v, ...)
end

function sharedata.update(name, v, ...)
	skynet.call(service, "lua", "update", name, v, ...)
end

function sharedata.delete(name)
	skynet.call(service, "lua", "delete", name)
end

function sharedata.flush()
	if skynet.is_record_handle() then return end
	for name, obj in pairs(cache) do
		sd.flush(obj)
	end
	collectgarbage()
end

function sharedata.deepcopy(name, ...)
	if skynet.is_record_handle() then
		assert(1 == 2, "record can`t use")
		return
	end
	if cache[name] then
		local cobj = cache[name].__obj
		return sd.copy(cobj, ...)
	end

	local cobj = skynet.call(service, "lua", "query", name)
	local ret = sd.copy(cobj, ...)
	skynet.send(service, "lua", "confirm" , cobj)
	return ret
end

return sharedata
