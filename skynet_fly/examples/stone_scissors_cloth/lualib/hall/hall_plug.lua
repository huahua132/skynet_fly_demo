
local log = require "log"
local pbnet_util = require "pbnet_util"
local pb_netpack = require "pb_netpack"

local assert = assert

local M = {}

M.unpack = pbnet_util.unpack

function M.init()
	pb_netpack.load("./proto")
end

function M.dispatch(gate,fd,packname,req,CMD)
	return false
end

function M.connect(gate,fd,player_id)
	log.info("hall_plug connect ",fd,player_id)
end

function M.disconnect(gate,fd,player_id)
	log.info("hall_plug disconnect ",fd,player_id)
end

function M.reconnect(gate,fd,player_id)
	log.info("hall_plug reconnect ",fd,player_id)
end

function M.goout(player_id)
	log.info("hall_plug goout ",player_id)
end

return M