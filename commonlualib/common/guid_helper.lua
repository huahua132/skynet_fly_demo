local function guid_helper_service()
    local skynet = require "skynet"
    local skynet_util = require "skynet-fly.utils.skynet_util"
    local ormtable = require "skynet-fly.db.orm.ormtable"
    local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
    local math_util = require "skynet-fly.utils.math_util"
    local log = require "skynet-fly.log"
    local CMD = {}

    local assert = assert
    local MACHINE_ID = tonumber(skynet.getenv("machine_id"))

    --总共53位， 为了兼容js,ts对int64的支持不好的问题
    local MACHINE_ID_BIT = 14             --机器号位数  最大支持配置       16,383
    local INCR_BIT       = 39             --自增序号数  最大分配           549,755,813,887

    local MACHINE_ID_BIT_MAX = (1 << MACHINE_ID_BIT) - 1
    local INCR_BIT_MAX = (1 << INCR_BIT) - 1

    local g_ormobj = nil

    function CMD.guid(module_id)
        local entry = g_ormobj:get_one_entry(module_id)
        if not entry then
            entry = g_ormobj:create_one_entry({
                module_id = module_id,
                incr = 0,
            })
        end

        local incr = entry:get('incr')
        assert(incr < INCR_BIT_MAX, "incr overflow")  --要溢出了
        incr = incr + 1
        entry:set('incr', incr)
        return MACHINE_ID << INCR_BIT | incr
    end

    skynet.start(function()

        assert(MACHINE_ID and MACHINE_ID <= MACHINE_ID_BIT_MAX, "invalid machine_id = " .. tostring(MACHINE_ID))
        
        local adapter = ormadapter_mysql:new("orm_db")
        g_ormobj = ormtable:new("_guid_alloc")
        :int64("module_id")       --模块id
        :int64("incr")            --自增值
        :set_keys("module_id")
        :set_cache(0, 500)    --永久缓存，5秒同步一次更改
        :builder(adapter)

        skynet_util.lua_dispatch(CMD)
    end)

    skynet_util.reg_shutdown_func(function()
        log.info("guid_helper shutdown begin---------")
        if g_ormobj then
            g_ormobj:save_change_now()
        end
        log.info("guid_helper shutdown end---------")
    end)
end


local service = require "skynet.service"
local skynet = require "skynet"
local GUID_MODULE = hotfix_require "common.enum.GUID_MODULE"

local INCR_BIT       = 39
local MACHINE_SHIFT = INCR_BIT
local MACHINE_MASK = (1 << MACHINE_SHIFT) - 1

local M = {
    GUID_MODULE = GUID_MODULE
}

local g_guid_helper
---@param module_id 模块ID
---@return number guid
function M.new_guid(module_id)
    local guid_helper = g_guid_helper or service.new("guid_helper", guid_helper_service)
    g_guid_helper = guid_helper
    return skynet.call(guid_helper, 'lua', 'guid', module_id)
end

---#desc 通过GUID获取机器号
---@param guid number 全局GUID
---@return number 机器号
function M.get_machine_id(guid)
    return guid >> MACHINE_SHIFT
end

---#desc 通过GUID获取自增序号
---@param guid number 全局GUID
---@return number 创建时间
function M.get_incr(guid)
    return guid & MACHINE_MASK
end

return M