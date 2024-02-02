local token_auth_mid = require "token_auth_mid"
local model_role = require "model_role"
local mysqlf = require "mysqlf"
local log = require "log"
local CODE = require "CODE"
local json = require "cjson"
local orm_table_client = require "orm_table_client"
local crypt_util = require "crypt_util"
local crypt = require "skynet.crypt"

local g_users_client = orm_table_client:new("users")

local string = string
local ipairs = ipairs

local M = {}

function M.login(username, password)
    local user_info,code,msg = g_users_client:get_one_entry(username)
    if not user_info then
        log.info("use not exists ", username)
        return
    end
    log.info("login:>>>", username, password)
    password = crypt_util.HMAC.SHA256(password, crypt.base64decode(user_info.key))
    log.info("login:>>>", user_info, password)
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
    local user_info = g_users_client:get_one_entry(username)
    if not user_info then
        return
    end
    user_info.password = nil                        --密码不能发给客户端
    user_info.key = nil                             --密钥也是
    user_info.roles = json.decode(user_info.roles)
    log.info("user_info>>",user_info)
    return user_info
end

return M