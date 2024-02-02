local ormtable = require "ormtable"
local ormadapter_mysql = require "ormadapter_mysql"
local crypt = require "skynet.crypt"
local crypt_util = require "crypt_util"
local json = require "cjson"
local log = require "log"

local pairs = pairs
local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

function M.init()
    local adapter = ormadapter_mysql:new("admin")
    g_ormobj = ormtable:new("users")                    --用户表
    :string64("username")                               --用户名
    :string1024("roles")                                --角色列表
    :string1024("introduction")                         --介绍
    :string256("avatar")                                --头像
    :string256("password")                              --密码
    :string32("key")                                    --密码随机key
    :int64("last_login_time")                           --最后一次登录的时间
    :set_keys("username")                               --用户名为主键
    :set_cache(0,100)    --永久缓存，1秒同步一次更改
    :builder(adapter)

    local entry = g_ormobj:get_one_entry("admin")
    if not entry then --还没有admin用户 创建一个
        local key = crypt.randomkey()
        local password = "skynet_fly123456"
        g_ormobj:create_one_entry({
            username = "admin",
            password = crypt_util.HMAC.SHA256(password, key),
            roles = json.encode({"admin"}),
            key = crypt.base64encode(key),
        })
        log.info("init admin password:", password)
    end
    return g_ormobj
end

M.handle = handle

return M