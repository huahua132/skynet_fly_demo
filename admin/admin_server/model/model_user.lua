local token_auth_mid = require "token_auth_mid"
local model_role = require "model_role"
local mysqlf = require "mysqlf"
local log = require "log"
local CODE = require "CODE"
local json = require "cjson"

local string = string
local ipairs = ipairs

local M = {}

function M.login(username, password)
    local user_info,code,msg = M.get_info(username)
    if not user_info then
        return user_info,code,msg
    end

    if user_info.password ~= password then
        log.error("err password")
        return nil,CODE.ERR_PASSWORD, "err password"
    end

    local role_info = model_role.get_all_roles()
    if not role_info then
        log.error("get_all_roles err ")
        return nil,CODE.ERR_SERVER, "roles err"
    end

    local role_info_map = {}
    for _,one_role in ipairs(role_info) do
        role_info_map[one_role.name] = one_role
    end

    local routes = {}

    for _,one_role in ipairs(user_info.roles) do
        local one_route = role_info_map[one_role]
        if one_route then
            routes = model_role.merge_routes(routes, one_route.routes)
        end
    end

    local routes_map = {}
    for _,one_route in ipairs(routes) do
        local path = one_route.path
        local children = one_route.children
        if children then
            for _,one_child in ipairs(children) do
                routes_map[path .. '/' ..one_child.path] = {w = one_child.w}
            end
        end
    end

    log.info("login>>", user_info.roles, routes_map)
    return {token = token_auth_mid.create_token(username,user_info.roles,routes_map)} 
end

function M.get_info(username)
    local sql = string.format("select * from users where username = '%s'\n", username)
    local user_info = mysqlf:instance():query(sql)
    if not user_info or #user_info <= 0 then
        log.info("can`t select user ",username)
        return nil,CODE.NOT_USER,"not user"
    end

    user_info = user_info[1]
    user_info.roles = json.decode(user_info.roles)
    log.info("user_info>>",user_info)
    return user_info
end

return M