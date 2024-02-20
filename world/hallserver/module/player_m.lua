local orm_table_client = require "orm_table_client"
local ALLOCID_MODULE = require "ALLOCID_MODULE"
local skynet = require "skynet"

local tonumber = tonumber
local assert = assert

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

function CMD.start()
    return true
end

function CMD.exit()
    return true
end

return CMD