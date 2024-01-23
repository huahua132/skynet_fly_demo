local ormtable = require "ormtable"
local ormadapter_mysql = require "ormadapter_mysql"
local json = require "cjson"

local pairs = pairs
local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

function M.init()
    local adapter = ormadapter_mysql:new("admin")
    g_ormobj = ormtable:new("users")
    :string64("username")
    :string1024("roles")
    :string1024("introduction")
    :string256("avatar")
    :string256("password")
    :set_keys("username")
    :set_cache(0,100)    --永久缓存，1秒同步一次更改
    :builder(adapter)

    local entity_list = g_ormobj:get_entry("admin")
    if #entity_list <= 0 then --还没有admin用户 创建一个
        g_ormobj:create_entry({
            username = "admin",
            password = "123456",
            roles = json.encode({"admin"})
        })
    end
    return g_ormobj
end

M.handle = handle

return M