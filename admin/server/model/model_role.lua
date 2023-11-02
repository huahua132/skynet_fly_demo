local mysqlf = require "mysqlf"
local log = require "log"
local json = require "cjson"
local CODE = require "CODE"
local mysql = require "mysql"

local string = string
local ipairs = ipairs

local function trim_routers(routes)
    local new_routes = {}
    for i,one_route in ipairs(routes) do
        new_routes[i] = {
            path = one_route.path,
            children = {}
        }

        for j,one_children in ipairs(one_route.children) do
            new_routes[i].children[j] = {
                path = one_children.path
            }
        end
    end

    return new_routes
end

local M = {}

function M.get_all_roles()
    local sql = "select * from roles"
    local sql_ret = mysqlf:instance():query(sql)
    if not sql_ret then
        log.info("sql err ",sql)
        return 
    end

    for i,one_rote in ipairs(sql_ret) do
        one_rote.routes = json.decode(one_rote.routes)
    end
    log.error("get_all_roles:>>",sql_ret)
    return sql_ret
end

function M.add_role(new_role)
    new_role.routes = json.encode(trim_routers(new_role.routes))

    log.info("new_role>>",new_role)

    local sql = string.format("insert into roles(`name`,`description`,`routes`) value('%s','%s','%s');",new_role.name,new_role.description,new_role.routes)
    local sql_ret = mysqlf:instance():query(sql)
    if not sql_ret or sql_ret.errno then
        return nil,CODE.ERR_SERVER,"insert err"
    end

    log.info("sql_ret:",sql_ret)
    return sql_ret.insert_id
end

function M.update_role(key,role)
    role.routes = json.encode(trim_routers(role.routes))

    log.info("update_role>>",role)
    
    local sql = string.format("update roles set `name`='%s',`description`='%s',`routes`= '%s' where `key`= %s;",role.name,role.description,role.routes,key)
    log.info("sql:",sql)
    local sql_ret = mysqlf:instance():query(sql)
    if not sql_ret or sql_ret.errno then
        return nil,CODE.ERR_SERVER,"update err"
    end

    log.info("sql_ret:",sql_ret)
    return true
end

function M.del_role(key)
    local sql = string.format("delete from roles where `key` = %s;",key)
    local sql_ret = mysqlf:instance():query(sql)
    if not sql_ret or sql_ret.errno then
        return nil,CODE.ERR_SERVER,"delete err"
    end

    return true
end

return M