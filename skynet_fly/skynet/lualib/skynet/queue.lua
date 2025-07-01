local skynet = require "skynet"
local coroutine = coroutine
local xpcall = xpcall
local traceback = debug.traceback
local table = table
local assert = assert
local error = error

local queue_trace_tag_map = setmetatable({}, {__mode = "kv"})

function skynet.queue()
	local current_thread
	local ref = 0
	local thread_queue = {}
	local queue_tag = skynet.queue_tag_create()

	local function xpcall_ret(ok, ...)
		ref = ref - 1
		if ref == 0 then
			skynet.del_queue_trace_tag(queue_tag)
			current_thread = table.remove(thread_queue,1)
			if current_thread then
				skynet.wakeup(current_thread)
			end
		end
		assert(ok, (...))
		return ...
	end

	local func = function(f, ...)
		local thread = coroutine.running()
		if current_thread and current_thread ~= thread then
			local queue_tags = skynet.get_queue_trace_tag()
			if queue_tags and queue_tags[queue_tag] then
				error(string.format("queue loop queue_tag[%s]", queue_tag))
			end

			table.insert(thread_queue, thread)
			skynet.wait()
			assert(ref == 0)	-- current_thread == thread
		end
		current_thread = thread
		ref = ref + 1
		if ref == 1 then
			skynet.set_queue_trace_tag(queue_tag)
		end
		return xpcall_ret(xpcall(f, traceback, ...))
	end

	queue_trace_tag_map[func] = queue_tag
	return func
end

if not skynet.queue_tag_create then
	function skynet.queue_tag_create()
		return nil
	end
end

function skynet.queue_get_queue_tag(queue)
	return queue_trace_tag_map[queue]
end

return skynet.queue
