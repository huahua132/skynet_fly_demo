local mysqlf = require "mysqlf"
local log = require "log"

local string = string

local mysql_client = nil

local M = {}

function M.get_all_roles()
    mysql_client = mysql_client or mysqlf:new()
    local sql = "select * from roles"
    local sql_ret = mysql_client:query(sql)
    if not sql_ret then
        log.info("sql err ",sql)
        return 
    end

    return sql_ret
end

return M