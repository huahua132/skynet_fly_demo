-- read https://github.com/cloudwu/skynet/wiki/FAQ for the module "skynet.core"
local c = require "skynet.core"
local skynet_require = require "skynet.require"
local tostring = tostring
local coroutine = coroutine
local assert = assert
local error = error
local pairs = pairs
local pcall = pcall
local table = table
local next = next
local sformat = string.format
local debug_getinfo = debug.getinfo

local g_is_trace = tonumber(c.command("GETENV", "trace")) == 1
local g_recordfile = c.command("GETENV","recordfile")

if g_recordfile ~= "" and c.addresscommand "REG" > 1 then
	local record_pre = require "skynet.record_pre"
	record_pre.skynet()
end

local tremove = table.remove
local tinsert = table.insert
local tpack = table.pack
local tunpack = table.unpack
local traceback = debug.traceback

local cresume = coroutine.resume
local running_thread = nil
local init_thread = nil

local function coroutine_resume(co, ...)
	running_thread = co
	return cresume(co, ...)
end
local coroutine_yield = coroutine.yield

local proto = {}
local skynet = {
	-- read skynet.h
	PTYPE_TEXT = 0,
	PTYPE_RESPONSE = 1,
	PTYPE_MULTICAST = 2,
	PTYPE_CLIENT = 3,
	PTYPE_SYSTEM = 4,
	PTYPE_HARBOR = 5,
	PTYPE_SOCKET = 6,
	PTYPE_ERROR = 7,
	PTYPE_QUEUE = 8,	-- used in deprecated mqueue, use skynet.queue instead
	PTYPE_DEBUG = 9,
	PTYPE_LUA = 10,
	PTYPE_SNAX = 11,
	PTYPE_TRACE = 12,	-- use for debug trace
}

-- code cache
skynet.cache = require "skynet.codecache"
skynet._proto = proto

function skynet.register_protocol(class)
	local name = class.name
	local id = class.id
	assert(proto[name] == nil and proto[id] == nil)
	assert(type(name) == "string" and type(id) == "number" and id >=0 and id <=255)
	proto[name] = class
	proto[id] = class
end

local session_id_coroutine = {}
local session_coroutine_id = {}
local session_coroutine_address = {}
local session_coroutine_tracetag = {}
local session_coroutine_luatrace = {}
local session_coroutine_queuetrace = {}
local unresponse = {}
local g_is_send = false

local wakeup_queue = {}
local sleep_session = {}

local watching_session = {}
local error_queue = {}
local fork_queue = { h = 1, t = 0 }

local auxsend, auxtimeout, auxwait
do ---- avoid session rewind conflict
	local csend = c.send
	local cintcommand = c.intcommand
	local dangerzone
	local dangerzone_size = 0x1000
	local dangerzone_low = 0x70000000
	local dangerzone_up	= dangerzone_low + dangerzone_size

	local set_checkrewind	-- set auxsend and auxtimeout for safezone
	local set_checkconflict -- set auxsend and auxtimeout for dangerzone

	local function reset_dangerzone(session)
		dangerzone_up = session
		dangerzone_low = session
		dangerzone = { [session] = true }
		for s in pairs(session_id_coroutine) do
			if s < dangerzone_low then
				dangerzone_low = s
			elseif s > dangerzone_up then
				dangerzone_up = s
			end
			dangerzone[s] = true
		end
		dangerzone_low = dangerzone_low - dangerzone_size
	end

	-- in dangerzone, we should check if the next session already exist.
	local function checkconflict(session)
		if session == nil then
			return
		end
		local next_session = session + 1
		if next_session > dangerzone_up then
			-- leave dangerzone
			reset_dangerzone(session)
			assert(next_session > dangerzone_up)
			set_checkrewind()
		else
			while true do
				if not dangerzone[next_session] then
					break
				end
				if not session_id_coroutine[next_session] then
					reset_dangerzone(session)
					break
				end
				-- skip the session already exist.
				next_session = c.genid() + 1
			end
		end
		-- session will rewind after 0x7fffffff
		if next_session == 0x80000000 and dangerzone[1] then
			assert(c.genid() == 1)
			return checkconflict(1)
		end
	end

	local function auxsend_checkconflict(addr, proto, msg, sz)
		local session = csend(addr, proto, nil, msg, sz)
		checkconflict(session)
		return session
	end

	local function auxtimeout_checkconflict(timeout)
		local session = cintcommand("TIMEOUT", timeout)
		checkconflict(session)
		return session
	end

	local function auxwait_checkconflict()
		local session = c.genid()
		checkconflict(session)
		return session
	end

	local function auxsend_checkrewind(addr, proto, msg, sz)
		local session = csend(addr, proto, nil, msg, sz)
		if session and session > dangerzone_low and session <= dangerzone_up then
			-- enter dangerzone
			set_checkconflict(session)
		end
		return session
	end

	local function auxtimeout_checkrewind(timeout)
		local session = cintcommand("TIMEOUT", timeout)
		if session and session > dangerzone_low and session <= dangerzone_up then
			-- enter dangerzone
			set_checkconflict(session)
		end
		return session
	end

	local function auxwait_checkrewind()
		local session = c.genid()
		if session > dangerzone_low and session <= dangerzone_up then
			-- enter dangerzone
			set_checkconflict(session)
		end
		return session
	end

	set_checkrewind = function()
		auxsend = auxsend_checkrewind
		auxtimeout = auxtimeout_checkrewind
		auxwait = auxwait_checkrewind
	end

	set_checkconflict = function(session)
		reset_dangerzone(session)
		auxsend = auxsend_checkconflict
		auxtimeout = auxtimeout_checkconflict
		auxwait = auxwait_checkconflict
	end

	-- in safezone at the beginning
	set_checkrewind()
end

do ---- request/select
	local function send_requests(self)
		local sessions = {}
		self._sessions = sessions
		local request_n = 0
		local err
		for i = 1, #self do
			local req = self[i]
			local addr = req[1]
			local p = proto[req[2]]
			assert(p.unpack)
			local tag = session_coroutine_tracetag[running_thread]
			if tag then
				c.trace(tag, "call", 4)
				c.send(addr, skynet.PTYPE_TRACE, 0, tag)
			end
			local trace_tag = session_coroutine_luatrace[running_thread]
			if g_is_trace and trace_tag and p == proto[skynet.PTYPE_LUA] then
				skynet.trace_log(trace_tag, 'selectcall', req[3], 4)
			end
			local session = auxsend(addr, p.id , p.pack(tunpack(req, 3, req.n)))
			if session == nil then
				err = err or {}
				err[#err+1] = req
			else
				sessions[session] = req
				watching_session[session] = addr
				session_id_coroutine[session] = self._thread
				request_n = request_n + 1
			end
		end
		self._request = request_n
		return err
	end

	local function request_thread(self)
		while true do
			local succ, msg, sz, session = coroutine_yield "SUSPEND"
			if session == self._timeout then
				self._timeout = nil
				self.timeout = true
			else
				watching_session[session] = nil
				local req = self._sessions[session]
				local p = proto[req[2]]
				if succ then
					self._resp[session] = tpack( p.unpack(msg, sz) )
				else
					self._resp[session] = false
				end
			end
			skynet.wakeup(self)
		end
	end

	local function request_iter(self)
		return function()
			if self._error then
				-- invalid address
				local e = tremove(self._error)
				if e then
					return e
				end
				self._error = nil
			end
			local session, resp = next(self._resp)
			if session == nil then
				if self._request == 0 then
					return
				end
				if self.timeout then
					return
				end
				skynet.wait(self)
				if self.timeout then
					return
				end
				session, resp = next(self._resp)
			end

			self._request = self._request - 1
			local req = self._sessions[session]
			self._resp[session] = nil
			self._sessions[session] = nil
			return req, resp
		end
	end

	local request_meta = {}	; request_meta.__index = request_meta

	function request_meta:add(obj)
		assert(type(obj) == "table" and not self._thread)
		self[#self+1] = obj
		return self
	end

	request_meta.__call = request_meta.add

	function request_meta:close()
		if self._request > 0 then
			local resp = self._resp
			for session, req in pairs(self._sessions) do
				if not resp[session] then
					session_id_coroutine[session] = "BREAK"
					watching_session[session] = nil
				end
			end
			self._request = 0
		end
		if self._timeout then
			session_id_coroutine[self._timeout] = "BREAK"
			self._timeout = nil
		end
	end

	request_meta.__close = request_meta.close

	function request_meta:select(timeout)
		assert(self._thread == nil)
		self._thread = coroutine.create(request_thread)
		self._error = send_requests(self)
		self._resp = {}
		if timeout then
			self._timeout = auxtimeout(timeout)
			session_id_coroutine[self._timeout] = self._thread
		end

		local running = running_thread
		coroutine_resume(self._thread, self)
		running_thread = running
		return request_iter(self), nil, nil, self
	end

	function skynet.request(obj)
		local ret = setmetatable({}, request_meta)
		if obj then
			return ret(obj)
		end
		return ret
	end
end

-- suspend is function
local suspend

----- monitor exit

local function dispatch_error_queue()
	local session = tremove(error_queue,1)
	if session then
		local co = session_id_coroutine[session]
		session_id_coroutine[session] = nil
		return suspend(co, coroutine_resume(co, false, nil, nil, session))
	end
end

local function _error_dispatch(error_session, error_source)
	skynet.ignoreret()	-- don't return for error
	if error_session == 0 then
		-- error_source is down, clear unreponse set
		for resp, address in pairs(unresponse) do
			if error_source == address then
				unresponse[resp] = nil
			end
		end
		for session, srv in pairs(watching_session) do
			if srv == error_source then
				tinsert(error_queue, session)
			end
		end
	else
		-- capture an error for error_session
		if watching_session[error_session] then
			tinsert(error_queue, error_session)
		end
	end
end

-- coroutine reuse

local coroutine_pool = setmetatable({}, { __mode = "kv" })

local function co_create(f)
	local co = tremove(coroutine_pool)
	if co == nil then
		co = coroutine.create(function(...)
			f(...)
			while true do
				local session = session_coroutine_id[co]
				if session and session ~= 0 then
					local source = debug.getinfo(f,"S")
					skynet.error(string.format("Maybe forgot response session %s from %s : %s:%d",
						session,
						skynet.address(session_coroutine_address[co]),
						source.source, source.linedefined))
				end
				-- coroutine exit
				local tag = session_coroutine_tracetag[co]
				if tag ~= nil then
					if tag then c.trace(tag, "end")	end
					session_coroutine_tracetag[co] = nil
				end

				local trace_tag = session_coroutine_luatrace[co]
				if trace_tag then
					if g_is_trace then
						skynet.trace_log(trace_tag, 'end')
					end
					session_coroutine_luatrace[co] = nil
				end

				local queue_tag = session_coroutine_queuetrace[co]
				if queue_tag then
					session_coroutine_queuetrace[co] = nil
				end

				local address = session_coroutine_address[co]
				if address then
					session_coroutine_id[co] = nil
					session_coroutine_address[co] = nil
				end

				-- recycle co into pool
				f = nil
				coroutine_pool[#coroutine_pool+1] = co
				-- recv new main function f
				f = coroutine_yield "SUSPEND"
				f(coroutine_yield())
			end
		end)
	else
		-- pass the main function f to coroutine, and restore running thread
		local running = running_thread
		coroutine_resume(co, f)
		running_thread = running
	end
	return co
end

local function dispatch_wakeup()
	while true do
		local token = tremove(wakeup_queue,1)
		if token then
			local session = sleep_session[token]
			if session then
				local co = session_id_coroutine[session]
				local tag = session_coroutine_tracetag[co]
				if tag then c.trace(tag, "resume") end
				local trace_tag = session_coroutine_luatrace[co]
				if g_is_trace and trace_tag then
					skynet.trace_log(trace_tag, 'resume')
				end
				session_id_coroutine[session] = "BREAK"
				return suspend(co, coroutine_resume(co, false, "BREAK", nil, session))
			end
		else
			break
		end
	end
	return dispatch_error_queue()
end

-- suspend is local function
function suspend(co, result, command)
	if not result then
		local session = session_coroutine_id[co]
		if session then -- coroutine may fork by others (session is nil)
			local addr = session_coroutine_address[co]
			if session ~= 0 then
				-- only call response error
				local tag = session_coroutine_tracetag[co]
				if tag then c.trace(tag, "error") end
				local trace_tag = session_coroutine_luatrace[co]
				if g_is_trace and trace_tag then
					skynet.trace_log(trace_tag, 'error')
				end
				c.send(addr, skynet.PTYPE_ERROR, session, "")
			end
			session_coroutine_id[co] = nil
		end
		session_coroutine_address[co] = nil
		session_coroutine_tracetag[co] = nil
		skynet.fork(function() end)	-- trigger command "SUSPEND"
		local tb = traceback(co,tostring(command))
		coroutine.close(co)
		error(tb)
	end
	if command == "SUSPEND" then
		return dispatch_wakeup()
	elseif command == "QUIT" then
		coroutine.close(co)
		-- service exit
		return
	elseif command == "USER" then
		-- See skynet.coutine for detail
		error("Call skynet.coroutine.yield out of skynet.coroutine.resume\n" .. traceback(co))
	elseif command == nil then
		-- debug trace
		return
	else
		error("Unknown command : " .. command .. "\n" .. traceback(co))
	end
end

local co_create_for_timeout
local timeout_traceback

function skynet.trace_timeout(on)
	local function trace_coroutine(func, ti)
		local co
		co = co_create(function()
			timeout_traceback[co] = nil
			func()
		end)
		local info = string.format("TIMER %d+%d : ", skynet.now(), ti)
		timeout_traceback[co] = traceback(info, 3)
		return co
	end
	if on then
		timeout_traceback = timeout_traceback or {}
		co_create_for_timeout = trace_coroutine
	else
		timeout_traceback = nil
		co_create_for_timeout = co_create
	end
end

skynet.trace_timeout(false)	-- turn off by default

function skynet.timeout(ti, func)
	local session = auxtimeout(ti)
	assert(session)
	local co = co_create_for_timeout(func, ti)
	assert(session_id_coroutine[session] == nil)
	session_id_coroutine[session] = co
	local trace_tag = session_coroutine_luatrace[co] or skynet.create_lua_trace()
	if trace_tag then
		session_coroutine_luatrace[co] = trace_tag
		if g_is_trace then
			skynet.trace_log(trace_tag, 'timeout', nil, 5)
		end
	end
	return co	-- for debug
end

local function suspend_sleep(session, token)
	local tag = session_coroutine_tracetag[running_thread]
	if tag then c.trace(tag, "sleep", 2) end
	local trace_tag = session_coroutine_luatrace[running_thread]
	if g_is_trace and trace_tag then
		skynet.trace_log(trace_tag, 'sleep', nil, 5)
	end
	session_id_coroutine[session] = running_thread
	assert(sleep_session[token] == nil, "token duplicative")
	sleep_session[token] = session

	return coroutine_yield "SUSPEND"
end

function skynet.sleep(ti, token)
	local session = auxtimeout(ti)
	assert(session)
	token = token or coroutine.running()
	local succ, ret = suspend_sleep(session, token)
	sleep_session[token] = nil
	if succ then
		return
	end
	if ret == "BREAK" then
		return "BREAK"
	else
		error(ret)
	end
end

function skynet.yield()
	return skynet.sleep(0)
end

function skynet.wait(token)
	local session = auxwait()
	token = token or coroutine.running()
	suspend_sleep(session, token)
	sleep_session[token] = nil
	session_id_coroutine[session] = nil
end

function skynet.killthread(thread)
	local session
	-- find session
	if type(thread) == "string" then
		for k,v in pairs(session_id_coroutine) do
			local thread_string = tostring(v)
			if thread_string:find(thread) then
				session = k
				break
			end
		end
	else
		local t = fork_queue.t
		for i = fork_queue.h, t do
			if fork_queue[i] == thread then
				table.move(fork_queue, i+1, t, i)
				fork_queue[t] = nil
				fork_queue.t = t - 1
				return thread
			end
		end
		for k,v in pairs(session_id_coroutine) do
			if v == thread then
				session = k
				break
			end
		end
	end
	local co = session_id_coroutine[session]
	if co == nil then
		return
	end
	local addr = session_coroutine_address[co]
	if addr then
		session_coroutine_address[co] = nil
		session_coroutine_tracetag[co] = nil
		local session = session_coroutine_id[co]
		if session > 0 then
			c.send(addr, skynet.PTYPE_ERROR, session, "")
		end
		session_coroutine_id[co] = nil
	end
	if watching_session[session] then
		session_id_coroutine[session] = "BREAK"
		watching_session[session] = nil
	else
		session_id_coroutine[session] = nil
	end
	for k,v in pairs(sleep_session) do
		if v == session then
			sleep_session[k] = nil
			break
		end
	end
	coroutine.close(co)
	return co
end

local self_address = nil
function skynet.self()
	if not self_address then
		self_address = c.addresscommand "REG"
	end
	return self_address
end

function skynet.recordon(filename)
	assert(filename:len() <= 128, "len need to be less than 128")
	c.command("RECORDON", skynet.address(skynet.self()) .. ' ' .. filename)
end

function skynet.recordoff()
	c.command("RECORDOFF", skynet.address(skynet.self()))
end

function skynet.recordstart(str)
	c.command("RECORDSTART", str)
end

local g_record_handle
function skynet.get_record_handle()
	if not g_record_handle then
		g_record_handle = c.getrecordhandle()
	end
	return g_record_handle
end

function skynet.is_record_handle()
	local shandle = skynet.self()
	if shandle <= 0 then return false end
	local rhandle = skynet.get_record_handle()
	return shandle == rhandle
end

local g_write_record = false
function skynet.is_write_record()
	return g_write_record
end

function skynet.localname(name)
	return c.addresscommand("QUERY", name)
end

skynet.now = c.now
skynet.hpc = c.hpc	-- high performance counter

local traceid = 0
function skynet.trace(info)
	skynet.error("TRACE", session_coroutine_tracetag[running_thread])
	if session_coroutine_tracetag[running_thread] == false then
		-- force off trace log
		return
	end
	traceid = traceid + 1

	local tag = string.format(":%08x-%d",skynet.self(), traceid)
	session_coroutine_tracetag[running_thread] = tag
	if info then
		c.trace(tag, "trace " .. info)
	else
		c.trace(tag, "trace")
	end
end

function skynet.tracetag()
	return session_coroutine_tracetag[running_thread]
end

local starttime

function skynet.starttime()
	if not starttime then
		starttime = c.intcommand("STARTTIME")
	end
	return starttime
end

function skynet.time()
	return skynet.now()/100 + (starttime or skynet.starttime())
end

function skynet.exit()
	fork_queue = { h = 1, t = 0 }	-- no fork coroutine can be execute after skynet.exit
	skynet.send(".launcher","lua","REMOVE",skynet.self(), false)
	-- report the sources that call me
	for co, session in pairs(session_coroutine_id) do
		local address = session_coroutine_address[co]
		if session~=0 and address then
			c.send(address, skynet.PTYPE_ERROR, session, "")
		end
	end
	for session, co in pairs(session_id_coroutine) do
		if type(co) == "thread" and co ~= running_thread then
			coroutine.close(co)
		end
	end
	for resp in pairs(unresponse) do
		resp(false)
	end
	-- report the sources I call but haven't return
	local tmp = {}
	for session, address in pairs(watching_session) do
		tmp[address] = true
	end
	for address in pairs(tmp) do
		c.send(address, skynet.PTYPE_ERROR, 0, "")
	end
	c.callback(function(prototype, msg, sz, session, source)
		if session ~= 0 and source ~= 0 then
			c.send(source, skynet.PTYPE_ERROR, session, "")
		end
	end)
	c.command("EXIT")
	-- quit service
	coroutine_yield "QUIT"
end

function skynet.getenv(key)
	return (c.command("GETENV",key))
end

function skynet.setenv(key, value)
	c.command("SETENV",key .. " " ..value)
end

function skynet.send(addr, typename, arg1,...)
	local p = proto[typename]
	if p == proto[skynet.PTYPE_LUA] then
		local trace_tag = session_coroutine_luatrace[running_thread]
		if g_is_trace and trace_tag then
			skynet.trace_log(trace_tag, 'send', arg1)
		end
	end

	g_is_send = true
	local msg, sz = p.pack(arg1, ...)
	g_is_send = false
	return c.send(addr, p.id, 0 , msg, sz)
end

function skynet.rawsend(addr, typename, msg, sz)
	local p = proto[typename]
	return c.send(addr, p.id, 0 , msg, sz)
end

skynet.genid = assert(c.genid)

skynet.redirect = function(dest,source,typename,...)
	return c.redirect(dest, source, proto[typename].id, ...)
end

skynet.pack = assert(c.pack)
skynet.packstring = assert(c.packstring)
skynet.unpack = assert(c.unpack)
skynet.tostring = assert(c.tostring)
skynet.trash = assert(c.trash)

local function yield_call(service, session)
	watching_session[session] = service
	session_id_coroutine[session] = running_thread
	local succ, msg, sz = coroutine_yield "SUSPEND"
	watching_session[session] = nil
	if not succ then
		error "call failed"
	end
	return msg,sz
end

function skynet.call(addr, typename, cmd, ...)
	local tag = session_coroutine_tracetag[running_thread]
	if tag then
		c.trace(tag, "call", 2)
		c.send(addr, skynet.PTYPE_TRACE, 0, tag)
	end

	local p = proto[typename]
	if p == proto[skynet.PTYPE_LUA] then
		local trace_tag = session_coroutine_luatrace[running_thread]
		if g_is_trace and trace_tag then
			skynet.trace_log(trace_tag, 'call', cmd, 3)
		end
	end

	local session = auxsend(addr, p.id , p.pack(cmd, ...))
	if session == nil then
		error("call to invalid address " .. skynet.address(addr))
	end
	return p.unpack(yield_call(addr, session))
end

function skynet.rawcall(addr, typename, msg, sz)
	local tag = session_coroutine_tracetag[running_thread]
	if tag then
		c.trace(tag, "call", 2)
		c.send(addr, skynet.PTYPE_TRACE, 0, tag)
	end
	local trace_tag = session_coroutine_luatrace[running_thread]
	if g_is_trace and trace_tag then
		skynet.trace_log(trace_tag, 'rawcall', nil, 3)
	end
	local p = proto[typename]
	local session = assert(auxsend(addr, p.id , msg, sz), "call to invalid address")
	return yield_call(addr, session)
end

function skynet.tracecall(tag, addr, typename, msg, sz)
	c.trace(tag, "tracecall begin")
	c.send(addr, skynet.PTYPE_TRACE, 0, tag)
	local p = proto[typename]
	local session = assert(auxsend(addr, p.id , msg, sz), "call to invalid address")
	local msg, sz = yield_call(addr, session)
	c.trace(tag, "tracecall end")
	return msg, sz
end

function skynet.ret(msg, sz)
	msg = msg or ""
	local tag = session_coroutine_tracetag[running_thread]
	if tag then c.trace(tag, "response") end
	local trace_tag = session_coroutine_luatrace[running_thread]
	if g_is_trace and trace_tag then
		skynet.trace_log(trace_tag, 'response')
	end
	local co_session = session_coroutine_id[running_thread]
	if co_session == nil then
		error "No session"
	end
	session_coroutine_id[running_thread] = nil
	if co_session == 0 then
		if sz ~= nil then
			c.trash(msg, sz)
		end
		return false	-- send don't need ret
	end
	local co_address = session_coroutine_address[running_thread]
	local ret = c.send(co_address, skynet.PTYPE_RESPONSE, co_session, msg, sz)
	if ret then
		return true
	elseif ret == false then
		-- If the package is too large, returns false. so we should report error back
		c.send(co_address, skynet.PTYPE_ERROR, co_session, "")
	end
	return false
end

function skynet.context()
	local co_session = session_coroutine_id[running_thread]
	local co_address = session_coroutine_address[running_thread]
	return co_session, co_address
end

function skynet.ignoreret()
	-- We use session for other uses
	session_coroutine_id[running_thread] = nil
end

function skynet.response(pack)
	pack = pack or skynet.pack

	local co_session = assert(session_coroutine_id[running_thread], "no session")
	session_coroutine_id[running_thread] = nil
	local co_address = session_coroutine_address[running_thread]
	if co_session == 0 then
		--  do not response when session == 0 (send)
		return function() end
	end

	local tarce_tag = session_coroutine_luatrace[running_thread]
	local function response(ok, ...)
		if ok == "TEST" then
			return unresponse[response] ~= nil
		end
		if not pack then
			error "Can't response more than once"
		end

		local ret
		if unresponse[response] then
			if ok then
				ret = c.send(co_address, skynet.PTYPE_RESPONSE, co_session, pack(...))
				if ret == false then
					-- If the package is too large, returns false. so we should report error back
					c.send(co_address, skynet.PTYPE_ERROR, co_session, "")
					if g_is_trace and tarce_tag then
						skynet.trace_log(tarce_tag, "delay response error")
					end
				else
					if g_is_trace and tarce_tag then
						skynet.trace_log(tarce_tag, "delay response")
					end
				end
			else
				ret = c.send(co_address, skynet.PTYPE_ERROR, co_session, "")
				if g_is_trace and tarce_tag then
					skynet.trace_log(tarce_tag, "delay response error2")
				end
			end
			unresponse[response] = nil
			ret = ret ~= nil
		else
			ret = false
		end
		pack = nil
		return ret
	end
	unresponse[response] = co_address

	return response
end

function skynet.retpack(...)
	return skynet.ret(skynet.pack(...))
end

function skynet.wakeup(token)
	if sleep_session[token] then
		tinsert(wakeup_queue, token)
		return true
	end
end

function skynet.dispatch(typename, func)
	local p = proto[typename]
	if func then
		local ret = p.dispatch
		p.dispatch = func
		return ret
	else
		return p and p.dispatch
	end
end

local function unknown_request(session, address, msg, sz, prototype)
	skynet.error(string.format("Unknown request (%s): %s", prototype, c.tostring(msg,sz)))
	error(string.format("Unknown session : %d from %x", session, address))
end

function skynet.dispatch_unknown_request(unknown)
	local prev = unknown_request
	unknown_request = unknown
	return prev
end

local function unknown_response(session, address, msg, sz)
	skynet.error(string.format("Response message : %s" , c.tostring(msg,sz)))
	error(string.format("Unknown session : %d from %x", session, address))
end

function skynet.dispatch_unknown_response(unknown)
	local prev = unknown_response
	unknown_response = unknown
	return prev
end

function skynet.fork(func,...)
	local n = select("#", ...)
	local co
	if n == 0 then
		co = co_create(func)
	else
		local args = { ... }
		co = co_create(function() func(table.unpack(args,1,n)) end)
	end
	local t = fork_queue.t + 1
	fork_queue.t = t
	fork_queue[t] = co
	local trace_tag = session_coroutine_luatrace[co] or skynet.create_lua_trace()
	if trace_tag then
		session_coroutine_luatrace[co] = trace_tag
		if g_is_trace then
			skynet.trace_log(trace_tag, 'fork begin', nil, 4)
		end
	end
	return co
end

local trace_source = {}

local function raw_dispatch_message(prototype, msg, sz, session, source)
	-- skynet.PTYPE_RESPONSE = 1, read skynet.h
	if prototype == 1 then
		local co = session_id_coroutine[session]
		if co == "BREAK" then
			session_id_coroutine[session] = nil
		elseif co == nil then
			unknown_response(session, source, msg, sz)
		else
			local tag = session_coroutine_tracetag[co]
			if tag then c.trace(tag, "resume") end
			local trace_tag = session_coroutine_luatrace[co]
			if g_is_trace and trace_tag then
				skynet.trace_log(trace_tag, 'resume')
			end
			session_id_coroutine[session] = nil
			suspend(co, coroutine_resume(co, true, msg, sz, session))
		end
	else
		local p = proto[prototype]
		if p == nil then
			if prototype == skynet.PTYPE_TRACE then
				-- trace next request
				trace_source[source] = c.tostring(msg,sz)
			elseif session ~= 0 then
				c.send(source, skynet.PTYPE_ERROR, session, "")
			else
				unknown_request(session, source, msg, sz, prototype)
			end
			return
		end

		local f = p.dispatch
		if f then
			local co = co_create(f)
			session_coroutine_id[co] = session
			session_coroutine_address[co] = source
			local traceflag = p.trace
			if traceflag == false then
				-- force off
				trace_source[source] = nil
				session_coroutine_tracetag[co] = false
			else
				local tag = trace_source[source]
				if tag then
					trace_source[source] = nil
					c.trace(tag, "request")
					session_coroutine_tracetag[co] = tag
				elseif traceflag then
					-- set running_thread for trace
					running_thread = co
					skynet.trace()
				end
			end
			suspend(co, coroutine_resume(co, session,source, p.unpack(msg,sz,co)))
		else
			trace_source[source] = nil
			if session ~= 0 then
				c.send(source, skynet.PTYPE_ERROR, session, "")
			else
				unknown_request(session, source, msg, sz, proto[prototype].name)
			end
		end
	end
end

function skynet.dispatch_message(...)
	local succ, err = pcall(raw_dispatch_message,...)
	while true do
		if fork_queue.h > fork_queue.t then
			-- queue is empty
			fork_queue.h = 1
			fork_queue.t = 0
			break
		end
		-- pop queue
		local h = fork_queue.h
		local co = fork_queue[h]
		fork_queue[h] = nil
		fork_queue.h = h + 1

		local fork_succ, fork_err = pcall(suspend,co,coroutine_resume(co))
		if not fork_succ then
			if succ then
				succ = false
				err = tostring(fork_err)
			else
				err = tostring(err) .. "\n" .. tostring(fork_err)
			end
		end
	end
	assert(succ, tostring(err))
end

function skynet.newservice(name, ...)
	return skynet.call(".launcher", "lua" , "LAUNCH", "snlua", name, ...)
end

function skynet.uniqueservice(global, ...)
	if global == true then
		return assert(skynet.call(".service", "lua", "GLAUNCH", ...))
	else
		return assert(skynet.call(".service", "lua", "LAUNCH", global, ...))
	end
end

function skynet.queryservice(global, ...)
	if global == true then
		return assert(skynet.call(".service", "lua", "GQUERY", ...))
	else
		return assert(skynet.call(".service", "lua", "QUERY", global, ...))
	end
end

function skynet.address(addr)
	if type(addr) == "number" then
		return string.format(":%08x",addr)
	else
		return tostring(addr)
	end
end

function skynet.harbor(addr)
	return c.harbor(addr)
end

skynet.error = c.error
skynet.tracelog = c.trace

-- true: force on
-- false: force off
-- nil: optional (use skynet.trace() to trace one message)
function skynet.traceproto(prototype, flag)
	local p = assert(proto[prototype])
	p.trace = flag
end

----- register protocol
do
	local REG = skynet.register_protocol

	REG {
		name = "lua",
		id = skynet.PTYPE_LUA,
		pack = skynet.pack,
		unpack = skynet.unpack,
	}

	REG {
		name = "response",
		id = skynet.PTYPE_RESPONSE,
	}

	REG {
		name = "error",
		id = skynet.PTYPE_ERROR,
		unpack = function(...) return ... end,
		dispatch = _error_dispatch,
	}
end

skynet.init = skynet_require.init
-- skynet.pcall is deprecated, use pcall directly
skynet.pcall = pcall

function skynet.init_service(start)
	local function main()
		skynet_require.init_all()
		start()
	end
	local ok, err = xpcall(main, traceback)
	if not ok then
		skynet.error("init service failed: " .. tostring(err))
		skynet.send(".launcher","lua", "ERROR")
		skynet.exit()
	else
		skynet.send(".launcher","lua", "LAUNCHOK")
	end
end

function skynet.start(start_func)
	c.callback(skynet.dispatch_message)
	init_thread = skynet.timeout(0, function()
		skynet.init_service(start_func)
		init_thread = nil
	end)
end

function skynet.endless()
	return (c.intcommand("STAT", "endless") == 1)
end

function skynet.mqlen()
	return c.intcommand("STAT", "mqlen")
end

function skynet.stat(what)
	return c.intcommand("STAT", what)
end

local function task_traceback(co)
	if co == "BREAK" then
		return co
	elseif timeout_traceback and timeout_traceback[co] then
		return timeout_traceback[co]
	else
		return traceback(co)
	end
end

function skynet.task(ret)
	if ret == nil then
		local t = 0
		for _,co in pairs(session_id_coroutine) do
			if co ~= "BREAK" then
				t = t + 1
			end
		end
		return t
	end
	if ret == "init" then
		if init_thread then
			return traceback(init_thread)
		else
			return
		end
	end
	local tt = type(ret)
	if tt == "table" then
		for session,co in pairs(session_id_coroutine) do
			local key = string.format("%s session: %d", tostring(co), session)
			ret[key] = task_traceback(co)
		end
		return
	elseif tt == "number" then
		local co = session_id_coroutine[ret]
		if co then
			return task_traceback(co)
		else
			return "No session"
		end
	elseif tt == "thread" then
		for session, co in pairs(session_id_coroutine) do
			if co == ret then
				return session
			end
		end
		return
	end
end

function skynet.uniqtask()
	local stacks = {}
	for session, co in pairs(session_id_coroutine) do
		local stack = task_traceback(co)
		local info = stacks[stack] or {count = 0, sessions = {}}
		info.count = info.count + 1
		if info.count < 10 then
			info.sessions[#info.sessions+1] = session
		end
		stacks[stack] = info
	end
	local ret = {}
	for stack, info in pairs(stacks) do
		local count = info.count
		local sessions = table.concat(info.sessions, ",")
		if count > 10 then
			sessions = sessions .. "..."
		end
		local head_line = string.format("%d\tsessions:[%s]\n", count, sessions)
		ret[head_line] = stack
	end
	return ret
end

function skynet.term(service)
	return _error_dispatch(0, service)
end

function skynet.memlimit(bytes)
	debug.getregistry().memlimit = bytes
	skynet.memlimit = nil	-- set only once
end

function skynet.start_record(ARGV, filename)
	--记录录像
	if g_recordfile == "" then
		g_write_record = true
		skynet.recordon(filename)
		skynet.recordstart(string.format("%08x", skynet.self()) .. SERVICE_NAME .. ' ' .. table.concat(ARGV, ' '))

		local old_mathrandseed = math.randomseed
		math.randomseed = function(x, y)
			c.recordsetrandomseed(x or 0, y or 0)
			return old_mathrandseed(x, y)
		end

		local old_ostime = os.time
		os.time = function(date)
			if date then
				return old_ostime(date)
			end
			
			local time = old_ostime()
			c.recordsetostime(time)

			return time
		end

		skynet.now = function()
			local now = c.now()
			c.recordsetnowtime(now)
			return now
		end
	end
	
	--设置随机种子，以便录像播放时使用
	math.randomseed(os.time(), math.random(1, 10000) + skynet.self())
end

function skynet.close_record()
	if g_recordfile == "" then
		skynet.recordoff()
	end
end

-- lua trace 相关
--重写 lua 消息的 skynet.pack skynet.unpack
do
	local luap = proto[skynet.PTYPE_LUA]
	local spack = skynet.pack
	local spackstring = skynet.packstring
	local sunpack = skynet.unpack
	luap.pack = function(...)
		local trace_tag = session_coroutine_luatrace[running_thread]
		local queue_tag = nil
		if not g_is_send then
			queue_tag = session_coroutine_queuetrace[running_thread] 
		end
		return spack(trace_tag, queue_tag, ...)
	end

	luap.unpack = function(msg, sz, co)
		local tab = tpack(sunpack(msg, sz))
		local trace_tag = tab[1]
		local queue_tag = tab[2]
		local cmd = tab[3]

		co = co or running_thread
		session_coroutine_queuetrace[co] = queue_tag
		local pre_trace_tag = session_coroutine_luatrace[co]
		if not pre_trace_tag then
			session_coroutine_luatrace[co] = trace_tag or skynet.create_lua_trace()
			if co then
				local trace_tag = session_coroutine_luatrace[co]
				if g_is_trace and trace_tag then
					skynet.trace_log(trace_tag, 'request', cmd, 5)
				end
			end
		end

		return tunpack(tab, 3, tab.n)
	end
	skynet.pack = luap.pack
	skynet.unpack = luap.unpack

	skynet.packstring = function(...)
		local trace_tag = session_coroutine_luatrace[running_thread]
		local queue_tag = session_coroutine_queuetrace[running_thread]
		return spackstring(trace_tag, queue_tag, ...)
	end
end

--trace_log
function skynet.trace_log(trace_tag, info, cmd, stack_level, ...)
	local stack_info = ""
	if stack_level and stack_level > 0 then
		for i = stack_level, stack_level - 2, -1 do
			local line_info = debug_getinfo(i, "Sl")
			if not line_info or line_info.currentline == -1 then break end
			stack_info = stack_info .. ' @' .. line_info.short_src .. ":" .. line_info.currentline
		end
	end
	skynet.error(sformat("{luatrace}{%s}{%s}{%s}{%s}{%s}", trace_tag, skynet.hpc(), info, cmd, stack_info), ...)
end

--创建trace_tag
function skynet.create_lua_trace()
	return nil
end

--设置trace_tag
function skynet.set_trace_tag()
	if not running_thread then return end
	if not session_coroutine_luatrace[running_thread] then
		session_coroutine_luatrace[running_thread] = skynet.create_lua_trace()
	end
end

--获取lua trace_tag
function skynet.get_lua_trace()
	if not running_thread then return end
	return session_coroutine_luatrace[running_thread]
end

--压入queue_trace_tag
function skynet.set_queue_trace_tag(tag)
	if not running_thread then return end
	if not tag then return end
	if not session_coroutine_queuetrace[running_thread] then
		session_coroutine_queuetrace[running_thread] = {}
	end
	session_coroutine_queuetrace[running_thread][tag] = true
end

--弹出queue_trace_tag
function skynet.del_queue_trace_tag(tag)
	if not running_thread then return end
	local tags = session_coroutine_queuetrace[running_thread]
	if not tags then return end
	tags[tag] = nil
end

--获取queue_trace_tag
function skynet.get_queue_trace_tag()
	if not running_thread then return end
	return session_coroutine_queuetrace[running_thread]
end

-- Inject internal debug framework
local debug = require "skynet.debug"
debug.init(skynet, {
	dispatch = skynet.dispatch_message,
	suspend = suspend,
	resume = coroutine_resume,
})

if g_recordfile ~= "" and skynet.self() > 1 then
	local record_do = require "skynet.record_do"
	record_do.skynet(skynet)
end

return skynet
