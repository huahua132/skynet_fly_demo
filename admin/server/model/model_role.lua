local mysqlf = require "mysqlf"
local log = require "log"
local json = require "cjson"
local CODE = require "CODE"
local mysql = require "mysql"
local contriner_client = require "contriner_client"

contriner_client:register("signature_m")

local string = string
local ipairs = ipairs
local pairs = pairs
local table = table

local function arr_to_map(arr,key)
    local map = {}
    for i,v in ipairs(arr) do
        map[v[key]] = v
    end

    return map
end

local function trim_routes(routes)
    local new_routes = {}
    for i,one_route in ipairs(routes) do
        new_routes[i] = {
            path = one_route.path,
            w = one_route.w,
            children = {}
        }

        for j,one_children in ipairs(one_route.children) do
            new_routes[i].children[j] = {
                path = one_children.path,
                w = one_route.w,
            }
        end
    end

    return new_routes
end

local function merge_routes(one_routes,two_routes)
    local one_map = arr_to_map(one_routes,'path')
    local two_map = arr_to_map(two_routes,'path')

    for path,one_route in pairs(two_map) do
        if one_map[path] then
            if one_route.w then
                one_map[path].w = true
            end

            local one_child = one_map[path].children or {}
            local two_child = one_route.children or {}

            local one_child_map = arr_to_map(one_child, 'path')
            local two_child_map = arr_to_map(two_child, 'path')
            for cpath,child in pairs(two_child_map) do
                if one_child_map[cpath] then
                    if child.w then
                        one_child_map[cpath].w = true
                    end
                else
                    one_child_map[cpath] = child
                end
            end

            one_map[path].children = {}
            for cpath,child in pairs(one_child_map) do
                table.insert(one_map[path].children, child)
            end
        else
            one_map[path] = one_route
        end
    end

    local res = {}
    for _,one_route in pairs(one_map) do
        table.insert(res, one_route)
    end

    return res
end

local M = {}

function M.merge_routes(one_routes,two_routes)
    return merge_routes(one_routes,two_routes)
end

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
    
    return sql_ret
end

function M.add_role(new_role)
    new_role.routes = json.encode(trim_routes(new_role.routes))

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
    role.routes = json.encode(trim_routes(role.routes))

    log.info("update_role>>",role)
    
    local sql = string.format("update roles set `name`='%s',`description`='%s',`routes`= '%s' where `key`= %s;",role.name,role.description,role.routes,key)
    log.info("sql:",sql)
    local sql_ret = mysqlf:instance():query(sql)
    if not sql_ret or sql_ret.errno then
        return nil,CODE.ERR_SERVER,"update err"
    end

    contriner_client:instance("signature_m"):mod_call("refresh")   --刷新密钥，使之前的token失效
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