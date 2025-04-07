local skynet = require "skynet"
local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_uselog = require "skynet-fly.db.ormadapter.ormadapter_uselog"
local SYN_CHANNEL_NAME = require "common.enum.SYN_CHANNEL_NAME"
local time_util = require "skynet-fly.utils.time_util"
local env_util = require "skynet-fly.utils.env_util"
local misc_helper = require "common.misc_helper"
local guid_util = require "skynet-fly.utils.guid_util"
local log = require "skynet-fly.log"

local assert = assert
local setmetatable = setmetatable
local rawget = rawget

local error_log_path = skynet.getenv('error_log_path')
local error_log_name = skynet.getenv('error_log_name')
local user_log_path = skynet.getenv('user_log_path')
local user_log_name = skynet.getenv('user_log_name')

local g_svr_type = env_util.get_svr_type()
local g_svr_id = env_util.get_svr_id()

local g_flush_inval = 0
if misc_helper.is_prod() then
    g_flush_inval = 10 * 60
end
local g_default_maxage = 7             --默认日志保留天数

local g_errobj = nil
local g_orm_obj_map = {}

local g_func_cache_map = {}

local M = {}
local mt = {__index = function(t, k)
    local v = M[k]
    if v then
        return v
    end
    local func = g_func_cache_map[k]
    if not func then
        func = function(self, ...)
            self._ormobj[k](self._ormobj, ...)
            return self
        end
        g_func_cache_map[k] = func
    end
    return func
end}

--错误日志
function M.error_log(err_str)
    local tab_name = "error_log"
    if not g_errobj then
        local adapter = ormadapter_uselog:new(error_log_path, error_log_name, 0, g_default_maxage)
        adapter:set_sub_syn(SYN_CHANNEL_NAME.log_desc_info .. tab_name)
        g_errobj = ormtable:new(tab_name)
        :string32("_guid")
        :string64("_log_name")
        :uint8('_svr_type')
        :uint16('_svr_id')
        :uint32('_time')
        :text('_err_str')
        :set_keys('_guid')
        :set_index('time_index', '_time')
        :set_index("svr_index", '_svr_type', '_svr_id')
        :builder(adapter)
    end

    local info = {
        _guid = guid_util.fly_guid(),
        _time = time_util.time(),
        _log_name = tab_name,
        _svr_type = g_svr_type,
        _svr_id = g_svr_id,
        _err_str = err_str,
    }

    g_errobj:create_one_entry(info)
end

--新建用户日志
function M:new_user_log(log_name, maxage)
    maxage = maxage or g_default_maxage
    local ormobj = ormtable:new(log_name)
    local t = {
        _ormobj = ormobj,
        _is_builder = false,
        _maxage = maxage,
    }
    
    setmetatable(t, mt)
    return t
end

--单例
function M:instance_use_log(log_name)
    local obj = g_orm_obj_map[log_name]
    if not obj then
        obj = M:new_user_log(log_name)
        g_orm_obj_map[log_name] = obj
    end
    
    return obj
end

--构建
function M:builder()
    assert(not self._is_builder)
    self._is_builder = true
    local adapter = ormadapter_uselog:new(user_log_path, user_log_name, g_flush_inval, self._maxage)
    adapter:set_sub_syn(SYN_CHANNEL_NAME.log_desc_info .. self._ormobj._tab_name)
    self._ormobj:string32('_guid')
    self._ormobj:string64('_log_name')
    self._ormobj:uint32('_time')
    self._ormobj:uint8('_svr_type')
    self._ormobj:uint16('_svr_id')
    self._ormobj:set_keys('_guid')
    self._ormobj:set_index('time_index', '_time')
    self._ormobj:set_index("svr_index", '_svr_type', '_svr_id')

    self._ormobj:builder(adapter)

    return self
end

function M:write_log(info_t)
    info_t._guid = guid_util.fly_guid()
    info_t._time = time_util.time()
    info_t._svr_type = g_svr_type
    info_t._svr_id = g_svr_id
    info_t._log_name = self._ormobj._tab_name
    self._ormobj:create_one_entry(info_t)
end

return M