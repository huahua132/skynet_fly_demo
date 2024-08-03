local log = require "skynet-fly.log"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local crypt = require "skynet.crypt"
local crypt_util = require "skynet-fly.utils.crypt_util"
local CODE = require "common.enum.CODE"
local string_util = require "skynet-fly.utils.string_util"
local time_util = require "skynet-fly.utils.time_util"
local rpc_hallserver_player_m = require "common.rpc.hallserver.player"
local player_util = require "common.utils.player"

local sbyte = string.byte
local assert = assert
local tonumber = tonumber
local string = string
local xx_pcall = xx_pcall

local g_orm_clients = {}
local g_alloc_client = orm_table_client:new("allocid")
local ACOUNT_TABLE_MAX = 10         --分表数量

local g_register_lock = {}

do
    for i = 1, ACOUNT_TABLE_MAX do
        g_orm_clients[i] = orm_table_client:new('account_' .. i)
    end
end

local function get_orm_by_account(account)
    local mod_num = sbyte(account, account:len()) --用账号最后一位做映射
    local index = mod_num % ACOUNT_TABLE_MAX + 1
    local orm_clinet = g_orm_clients[index]
    return orm_clinet
end

local CMD = {}
-- 注册账号
-- 玩家id生成
--   92,   23,3   72,03  6,854,775,807
-- 预留位 渠道id   服务id    自增id

--由于js没有long类型，最大能表示 2^53-1的整数，所以调整一下ID结构,为了尽可能的兼容所有客户端
-- 9      0071      9925   4740991      (1个能注册1千万-1个账号)
-- 预留位 渠道id    服务id   自增id
local MAX_INCRID = 9999999
local function register(account_info, channel)
    assert(channel <= 9999, "overflow  channel = ",channel)
    local account = account_info.account --账号
    local account_len = account:len()
    if account_len < 6 or account_len > 32 then
        return nil, CODE.ACCOUNT_LEN, "the account length needs to be between 6 and 32 characters"
    end
    local orm_clinet = get_orm_by_account(account)
    if orm_clinet:get_one_entry(account) then
        return nil, CODE.EXISTS_USER, "EXISTS_USER"
    end

    local module_id, svr_id = rpc_hallserver_player_m.get_module_id()
    if not module_id then
        return nil, CODE.SERVER_ERR, "can`t get module_id"
    end

    local incrid = g_alloc_client:incr(module_id)
    if incrid > MAX_INCRID then
        return nil, CODE.SERVER_ERR, "incr overflow"
    end

    local player_id = player_util.builder_player_id(channel, svr_id, incrid)
    local ret = rpc_hallserver_player_m.register(player_id, account)
    if not ret then
        return nil, CODE.SERVER_ERR, "hall register err svr_id = " .. svr_id
    end

    account_info.key = crypt.randomkey()
    account_info.password = crypt_util.HMAC.SHA256(account_info.password, account_info.key)
    account_info.key = crypt.base64encode(account_info.key)
    account_info.player_id = player_id
    account_info.hall_server_id = svr_id
    account_info.channel = channel
    account_info.create_time = time_util.time()
    if orm_clinet:create_one_entry(account_info) then
        return true
    else
        return nil, CODE.SERVER_ERR, "create entry err"
    end
end

function CMD.register(account_info, channel)
    local account = account_info.account
    assert(account, "not account")
    if g_register_lock[account] then return nil,CODE.SERVER_BUZY,"SERVER_BUZY" end
    g_register_lock[account] = true
    local ret,errno,errmsg = xx_pcall(register, account_info, channel)
    g_register_lock[account] = nil
    return ret, errno, errmsg
end

--验证登录
function CMD.auth(account, password)
    local orm_clinet = get_orm_by_account(account)
    local account_info = orm_clinet:get_one_entry(account)
    if not account_info then
        return nil, CODE.NOT_USER, "NOT_USER"
    end

    password = crypt_util.HMAC.SHA256(password, crypt.base64decode(account_info.key))
    if account_info.password ~= password then
        return nil, CODE.ERR_PASSWORD, "ERR_PASSWORD"
    end
    --log.info("auth >>>>> :", account_info)
    account_info.last_login_time = time_util.time()
    orm_clinet:change_save_one_entry(account_info)
    return true, account_info.player_id, account_info.hall_server_id
end

-- 查询账号玩家id
function CMD.get(account)
    local orm_clinet = get_orm_by_account(account)
    local account_info = orm_clinet:get_one_entry(account)
    if not account_info then
        return
    end

    return account_info.player_id, account_info.hall_server_id
end

function CMD.start()
    return true
end

function CMD.exit()
    return true
end

return CMD