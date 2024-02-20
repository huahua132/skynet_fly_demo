local orm_table_client = require "orm_table_client"
local ALLOCID_MODULE = require "ALLOCID_MODULE"
local skynet = require "skynet"
local cache_help = require "cache_help"
local contriner_client = require "contriner_client"
local C_ENUM = require "C_ENUM"

contriner_client:register("share_config_m")

local tonumber = tonumber
local assert = assert

local randkey_cache = cache_help:new(C_ENUM.LOGIN_TOKEN_TIME_OUT * 100)
local g_host = nil

local SVR_MODULE_ID = {
    [1] = ALLOCID_MODULE.hallplayer_1,
    [2] = ALLOCID_MODULE.hallplayer_2,
}

local CMD = {}

local g_player_cli = orm_table_client:new("player")
local g_svr_id = tonumber(skynet.getenv('svr_id'))

local g_cur_module_id = assert(SVR_MODULE_ID[g_svr_id])

--注册用户
function CMD.register(player_id)
    if g_player_cli:create_one_entry({player_id = player_id}) then
        return true
    end

    return false
end

--获取模块ID
function CMD.get_module_id()
    return g_cur_module_id
end

--预告登录
function CMD.advance_login(player_id, randkey)
    randkey_cache:del_cache(player_id)
    randkey_cache:set_cache(player_id, randkey)
    return g_host
end

--获取randkey
function CMD.get_randkey(player_id)
    return randkey_cache:get_cache(player_id)
end

function CMD.start()
    skynet.fork(function()
        local confclient = contriner_client:new("share_config_m")
        local room_game_login = confclient:mod_call('query','room_game_login')
        g_host = room_game_login.gateconf.host
    end)
    return true
end

function CMD.exit()
    return true
end

return CMD