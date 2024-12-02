local skynet = require "skynet"
local gateserver = require "snax.gateserver"

local assert = assert
local tinsert = table.insert

local watchdog
local connection = {}	-- fd -> connection : { fd , client, agent , ip, mode }

skynet.register_protocol {
	name = "client",
	id = skynet.PTYPE_CLIENT,
}

local handler = {}

function handler.open(source, conf)
	watchdog = conf.watchdog or source
	return conf.address, conf.port
end

function handler.message(fd, msg, sz)
	-- recv a package, forward it
	local c = connection[fd]
	local agent = c.agent
	if agent then
		-- It's safe to redirect msg directly , gateserver framework will not free msg.
		if c.is_pause then
			if not c.msg_que then
				c.msg_que = {}
			end

			tinsert(c.msg_que, skynet.tostring(msg, sz))
			skynet.trash(msg,sz)
		else
			skynet.redirect(agent, c.client, "client", fd, msg, sz)
		end
	else
		skynet.send(watchdog, "lua", "socket", "data", fd, skynet.tostring(msg, sz))
		-- skynet.tostring will copy msg to a string, so we must free msg here.
		skynet.trash(msg,sz)
	end
end

function handler.connect(fd, addr)
	local c = {
		fd = fd,
		ip = addr,
	}
	connection[fd] = c
	skynet.send(watchdog, "lua", "socket", "open", fd, addr)
end

local function unforward(c)
	if c.agent then
		c.agent = nil
		c.client = nil
	end
end

local function close_fd(fd)
	local c = connection[fd]
	if c then
		unforward(c)
		connection[fd] = nil
	end
end

function handler.disconnect(fd)
	close_fd(fd)
	skynet.send(watchdog, "lua", "socket", "close", fd)
end

function handler.error(fd, msg)
	close_fd(fd)
	skynet.send(watchdog, "lua", "socket", "error", fd, msg)
end

function handler.warning(fd, size)
	skynet.send(watchdog, "lua", "socket", "warning", fd, size)
end

local CMD = {}

function CMD.forward(source, fd, client, address)
	if not connection[fd] then
		return false
	end
	local c = connection[fd]
	unforward(c)
	c.client = client or 0
	c.agent = address or source
	gateserver.openclient(fd)
	return true
end

function CMD.accept(source, fd)
	local c = assert(connection[fd])
	unforward(c)
	gateserver.openclient(fd)
end

function CMD.kick(source, fd)
	gateserver.closeclient(fd)
end

function CMD.pause(source, fd)
	if not connection[fd] then
		return false
	end
	local c = connection[fd]
	c.is_pause = true

	return true
end

function CMD.play(source, fd)
	if not connection[fd] then
		return false
	end
	local c = connection[fd]
	c.is_pause = nil

	local msg_que = c.msg_que
	if msg_que then
		local agent = c.agent
		for i = 1, #msg_que do
			if agent then
				skynet.redirect(agent, c.client, "client", fd, msg_que[i])
			else
				skynet.send(watchdog, "lua", "socket", "data", fd, msg_que[i])
			end
		end

		c.msg_que = nil
	end

	return true
end

function handler.command(cmd, source, ...)
	local f = assert(CMD[cmd])
	return f(source, ...)
end

gateserver.start(handler)
