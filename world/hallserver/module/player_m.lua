local orm_table_client = require "skynet-fly.client.orm_table_client"
local skynet = require "skynet"
local container_client = require "skynet-fly.client.container_client"
local ENUM = require "common.enum.ENUM"
local log = require "skynet-fly.log"
local time_util = require "skynet-fly.utils.time_util"
local regiter = require "common.redis.count.regiter"
local env_util = require "skynet-fly.utils.env_util"

container_client:register("share_config_m")

local tonumber = tonumber
local assert = assert

local g_host = nil

local CMD = {}

local g_player_cli = orm_table_client:new("player")
local g_game_record_cli = orm_table_client:new("game_record")
local g_svr_id = env_util.get_svr_id()

--注册用户
function CMD.register(player_id, account)
    if not g_player_cli:create_one_entry({
        player_id = player_id,
        nickname = account,
        create_time = time_util.time(),
        level = 1,
        viplevel = 1,
        }) then
        return false
    end
    skynet.fork(regiter.add, player_id)   --统计注册
    return true
end

--获取模块ID
function CMD.get_module_id()
    return g_svr_id
end

--获取host
function CMD.get_host()
    return g_host
end

--添加游戏记录
function CMD.add_game_record(...)
    g_game_record_cli:add_record(...)
end

function CMD.start()
    skynet.fork(function()
        local confclient = container_client:new("share_config_m")
        local room_game_login = confclient:mod_call('query','room_game_login')
        g_host = room_game_login.wsgateconf.host
    end)
    return true
end

function CMD.exit()
    return true
end

return CMD