local token_auth_mid = require "middleware.token_auth_mid"
local model_role = require "model.model_role"
local mysqlf = require "skynet-fly.db.mysqlf"
local log = require "skynet-fly.log"
local CODE = require "common.enum.CODE"
local json = require "cjson"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local crypt_util = require "skynet-fly.utils.crypt_util"
local crypt = require "skynet.crypt"
local time_util = require "skynet-fly.utils.time_util"

local g_users_client = orm_table_client:new("users")

local string = string
local ipairs = ipairs
local assert = assert
local type = type

local M = {}

function M.login(username, password)
    local user_info,code,msg = g_users_client:get_one_entry(username)
    if not user_info then
        log.info("use not exists ", username)
        return
    end
    log.info("login:", password, user_info)
    password = crypt_util.HMAC.SHA256(password, crypt.base64decode(user_info.key))
    if user_info.password ~= password then
        log.error("err password")
        return nil,CODE.ERR_PASSWORD, "err password"
    end
    
    user_info.roles = json.decode(user_info.roles)
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
    user_info.password = nil                        --密码不能发给客户端
    user_info.key = nil                             --密钥也是
    log.info("login>>", user_info.roles, routes_map)
    g_users_client:change_save_one_entry({username = user_info.username, last_login_time = time_util.time()})

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

function M.list()
    local user_list = g_users_client:get_all_entry()
    for i = 1, #user_list do
        local user_info = user_list[i]
        user_info.password = nil                        --密码不能发给客户端
        user_info.key = nil                             --密钥也是
        user_info.roles = json.decode(user_info.roles)
    end
    return user_list
end

function M.add(new_user)
    local username = new_user.username
    if not username or username == "" then
        return nil, CODE.ERR_PARAM, "not username"
    end

    if not new_user.roles or #new_user.roles <= 0 then
        return nil, CODE.ERR_PARAM, "not roles"
    end

    for _,role in ipairs(new_user.roles) do
        if not model_role.get_role(role) then
            return nil, CODE.ERR_PARAM, "not exists role: " .. role
        end
    end

    local old_user = g_users_client:get_one_entry(username)
    if old_user then
        return nil, CODE.ERR_PARAM, "username repeat"
    end

    local key = crypt.randomkey()
    new_user.password = crypt_util.HMAC.SHA256(new_user.password, key)
    new_user.roles = json.encode(new_user.roles)
    new_user.key = crypt.base64encode(key)
    
    local user_info = g_users_client:create_one_entry(new_user)
    if not user_info then
        return nil, CODE.ERR_SERVER, "create err"
    end
    user_info.password = nil                        --密码不能发给客户端
    user_info.key = nil                             --密钥也是
    return user_info
end

function M.update(username, user)
    if not user.roles or #user.roles <= 0 then
        return nil, CODE.ERR_PARAM, "not roles"
    end

    for _,role in ipairs(user.roles) do
        if not model_role.get_role(role) then
            return nil, CODE.ERR_PARAM, "not exists role: " .. role
        end
    end

    local user_info = g_users_client:get_one_entry(username)
    if not user_info then
        return nil, CODE.ERR_PARAM, "user not exists"
    end
    
    if user.password and user.password ~= '' then
        user.password = crypt_util.HMAC.SHA256(user.password, crypt.base64decode(user_info.key))
    end

    user.roles = json.encode(user.roles)
    if not g_users_client:change_save_one_entry(user) then
        return nil, CODE.ERR_SERVER, "save err"
    end

    return "success"
end

function M.delete(username)
    if username == 'admin' then
        return nil, CODE.ERR_PARAM, "can`t del admin user"
    end

    if not g_users_client:delete_entry(username) then
        return nil, CODE.ERR_SERVER, "delete err"
    end

    return "success"
end

return M