local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local ENUM = require "enum.ENUM"
local log = require "skynet-fly.log"
local json = require "cjson"

local pairs = pairs
local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

function M.init()
    local adapter = ormadapter_mysql:new("admin")
    g_ormobj = ormtable:new("roles")
    :string64("name")
    :string512("description")
    :string8192("routes")
    :set_keys("name")
    :set_cache(0,100)    --永久缓存，1秒同步一次更改
    :builder(adapter)

    local entry = g_ormobj:get_one_entry(ENUM.DEFAULT_ROLE)
    if not entry then --默认角色
        g_ormobj:create_one_entry({
            name = ENUM.DEFAULT_ROLE,
            routes = json.encode({})
        })
        log.info("default role", ENUM.DEFAULT_ROLE)
    end

    return g_ormobj
end

M.handle = handle

return M