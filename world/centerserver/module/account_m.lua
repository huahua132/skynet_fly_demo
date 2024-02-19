local log = require "log"
local orm_table_client = require "orm_table_client"
local crypt = require "skynet.crypt"
local crypt_util = require "crypt_util"
local errorcode = require "errorcode"

local sbyte = string.byte
local assert = assert

local g_orm_clients = {}
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
--注册账号
function CMD.register(account_info)
    local account = account_info.account --账号
    assert(account:len() >= 6, "account not long enough")
    
    account_info.key = crypt.randomkey()
    account_info.password = crypt_util.HMAC.SHA256(account_info.password, account_info.key)

    local orm_clinet = get_orm_by_account(account)
    if orm_clinet:create_one_entry(account_info) then
        return true
    else
        return false
    end
end

--验证登录
function CMD.auth(account, password)
    local orm_clinet = get_orm_by_account(account)
    local account_info = orm_clinet:get_one_entry(account)
    if not account_info then
        return false, errorcode.ACCOUNT_NOT_EXISTS, "ACCOUNT_NOT_EXISTS"
    end

    password = crypt_util.HMAC.SHA256(password, crypt.base64decode(account_info.key))
    if account_info.password ~= password then
        return false, errorcode.LOGIN_PASS_ERR, "LOGIN_PASS_ERR"
    end

    return true
end

function CMD.start()
    return true
end

function CMD.exit()
    return true
end

return CMD