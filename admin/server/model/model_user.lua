local token_auth_mid = require "token_auth_mid"
local mysqlf = require "mysqlf"
local log = require "log"
local CODE = require "CODE"
local json = require "cjson"

local string = string

local mysql_client = nil

local M = {}

function M.login(username, password)
    mysql_client = mysql_client or mysqlf:new()

    local sql = string.format("select password from users where username = '%s'\n", username)
    local user_info = mysql_client:query(sql)
    if not user_info or #user_info <= 0 then
        log.info("can`t select user ",username)
        return CODE.NOT_USER,"not user"
    end

    user_info = user_info[1]
    if user_info.password ~= password then
        log.info("err password")
        return CODE.ERR_PASSWORD, "err password"
    end

    return token_auth_mid.create_token(username)
end

function M.get_info(username)
    mysql_client = mysql_client or mysqlf:new()

    local sql = string.format("select * from users where username = '%s'\n", username)
    local user_info = mysql_client:query(sql)
    if not user_info or #user_info <= 0 then
        log.info("can`t select user ",username)
        return CODE.NOT_USER,"not user"
    end

    user_info = user_info[1]
    user_info.roles = json.decode(user_info.roles)
    log.info("user_info>>",user_info)
    return user_info
end

return M