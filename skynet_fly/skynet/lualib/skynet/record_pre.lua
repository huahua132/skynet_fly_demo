local c = require "skynet.core"
local socketdriver = require "skynet.socketdriver"

local M = {}

function M.skynet()
    c.send = function(addr, proto, session, msg, sz)
        if not session then
            return c.recordgenid()
        end

        return session
    end
    
    c.genid = function()
        return c.recordgenid()
    end

    local old_cintcommand = c.intcommand
    c.intcommand = function(sub_cmd, ...)
        if sub_cmd == "TIMEOUT" then
            return c.recordgenid()
        else
            return old_cintcommand(sub_cmd, ...)
        end
    end

    local oldcaddresscommand = c.addresscommand
    c.addresscommand = function(sub_cmd, ...)
        if sub_cmd == "QUERY" then
            return c.recordhandle()
        else
            return oldcaddresscommand(sub_cmd, ...)
        end
    end

    socketdriver.connect = function(...)
        local id = c.recordsocketid()
        assert(id > 0, "record or connect err")
        return id
    end

    local empty_func = function()
        return true
    end

    socketdriver.close = empty_func
    socketdriver.shutdown = empty_func

    socketdriver.listen = function()
        local id = c.recordsocketid()
        assert(id > 0, "record or listen err")
        return id
    end

    socketdriver.send = empty_func
    socketdriver.lsend = empty_func

    socketdriver.bind = function()
        local id = c.recordsocketid()
        assert(id > 0, "record err")
        return id
    end

    socketdriver.start = empty_func
    socketdriver.pause = empty_func
    socketdriver.nodelay = empty_func

    socketdriver.udp = function()
        local id = c.recordsocketid()
        assert(id > 0, "record or udp err")
        return id
    end

    socketdriver.udp_connect = empty_func
    socketdriver.udp_dial = function()
        local id = c.recordsocketid()
        assert(id > 0, "udp_dial or udp err")
        return id
    end

    socketdriver.udp_listen = function()
        local id = c.recordsocketid()
        assert(id > 0, "udp_listen or udp err")
        return id
    end

    socketdriver.udp_send = empty_func
    socketdriver.resolve = empty_func
 
    local old_mathrandomseed = math.randomseed
    math.randomseed = function(x, y)
        local x,y = c.recordrandomseed()
        return old_mathrandomseed(x, y)
    end

    local old_ostime = os.time
    os.time = function(date)
        if date then
            return old_ostime(date)
        end
        
        local time = c.recordgetostime()
        assert(time > 0, "record ostime err")  --录像记录不一致
        return time
    end

    c.now = function()
        local now = c.recordgetnowtime()
        assert(now > 0, "record now err")    --录像记录不一致
        return now
    end
end

return M