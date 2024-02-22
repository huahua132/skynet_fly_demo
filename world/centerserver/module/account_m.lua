local log = require "log"
local orm_table_client = require "orm_table_client"
local crypt = require "skynet.crypt"
local crypt_util = require "crypt_util"
local cluster_client = require "cluster_client"
local errorcode = require "errorcode"
local string_util = require "string_util"

local sbyte = string.byte
local assert = assert
local tonumber = tonumber
local string = string

local g_orm_clients = {}
local g_alloc_clinet = orm_table_client:new("allocid")
local ACOUNT_TABLE_MAX = 10         --分表数量

do
    for i = 1, ACOUNT_TABLE_MAX do
        g_orm_clients[i] = orm_table_client:new('account_' .. i)
    end
end

local function get_orm_by_account(account)
    local mod_num = sbyte(account:len()) --用账号最后一位做映射
    local index = mod_num % ACOUNT_TABLE_MAX + 1
    local orm_clinet = g_orm_clients[index]
    return orm_clinet
end

local CMD = {}
-- 注册账号
-- 玩家id生成
--   9,   223,3   72,03  6,854,775,807
-- 预留位 渠道id   服务id    自增id
local MAX_INCRID = 9999999999
function CMD.register(account_info)
    local account = account_info.account --账号
    assert(account:len() >= 6, "account not long enough")
    local orm_clinet = get_orm_by_account(account)
    if orm_clinet:get_one_entry(account) then
        return nil, errorcode.ACCOUNT_EXISTS, "ACCOUNT_EXISTS"
    end

    local cli = cluster_client:instance("hallserver", "player_m")
    local ret = cli:one_balance_call("get_module_id")
    local cluster_name = ret.cluster_name
    local result = ret.result
    local module_id = result[1]
    local svr_id = tonumber(string_util.split(cluster_name, ':')[2])
    cli:set_svr_id(svr_id)

    local incrid = g_alloc_clinet:incr(module_id)
    assert(incrid > MAX_INCRID, "incr overflow")
    local player_id = tonumber(string.format("1%04d%04d%010d", 1, svr_id, incrid))
    ret = cli:byid_balance_call("register", player_id)
    local result = ret.result[1]
    assert(result, "register err")
    account_info.key = crypt.randomkey()
    account_info.password = crypt_util.HMAC.SHA256(account_info.password, account_info.key)

    if orm_clinet:create_one_entry(account_info) then
        return true
    else
        return nil
    end
end

--验证登录
function CMD.auth(account, password)
    local orm_clinet = get_orm_by_account(account)
    local account_info = orm_clinet:get_one_entry(account)
    if not account_info then
        return nil, errorcode.ACCOUNT_NOT_EXISTS, "ACCOUNT_NOT_EXISTS"
    end

    password = crypt_util.HMAC.SHA256(password, crypt.base64decode(account_info.key))
    if account_info.password ~= password then
        return nil, errorcode.LOGIN_PASS_ERR, "LOGIN_PASS_ERR"
    end

    return true, account_info.player_id, account_info.hall_server_id
end

--查询账号玩家id
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