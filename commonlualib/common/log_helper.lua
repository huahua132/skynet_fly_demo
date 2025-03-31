local skynet = require "skynet"
local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_uselog = require "skynet-fly.db.ormadapter.ormadapter_uselog"
local SYN_CHANNEL_NAME = require "common.enum.SYN_CHANNEL_NAME"
local time_util = require "skynet-fly.utils.time_util"
local env_util = require "skynet-fly.utils.env_util"
local log = require "skynet-fly.log"

local assert = assert
local setmetatable = setmetatable
local rawget = rawget

local error_log_path = skynet.getenv('error_log_path')
local error_log_name = skynet.getenv('error_log_name')
local user_log_path = skynet.getenv('user_log_path')
local user_log_name = skynet.getenv('user_log_name')

local g_svr_name = env_util.get_svr_name()
local g_svr_id = env_util.get_svr_id()

local g_flush_inval = 10 * 60
local g_max_age = 7

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
    if not g_errobj then
        local adapter = ormadapter_uselog:new(error_log_path, error_log_name, 0, g_max_age)
        adapter:set_sub_syn(SYN_CHANNEL_NAME.log_desc_info)
        g_errobj = ormtable:new("error_log")
        :string64('svr_name')
        :uint32('svr_id')
        :uint32('time')
        :text('err_str')
        :set_keys('svr_id') --没有意义
        :set_index('time_index', 'time')
        :set_index("svr_index", 'svr_name', 'svr_id')
        :builder(adapter)
    end

    local info = {
        time = time_util.time(),
        svr_name = g_svr_name,
        svr_id = g_svr_id,
        err_str = err_str,
    }

    g_errobj:create_one_entry(info)
end

--新建用户日志
function M:new_user_log(log_name)
    local ormobj = ormtable:new(log_name)
    local t = {
        _ormobj = ormobj,
        _is_builder = false,
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
    local adapter = ormadapter_uselog:new(user_log_path, user_log_name, g_flush_inval, g_max_age)
    adapter:set_sub_syn(SYN_CHANNEL_NAME.log_desc_info)
    
    self._ormobj:uint32('time')
    self._ormobj:string64('svr_name')
    self._ormobj:uint32('svr_id')
    self._ormobj:set_keys('svr_id') --没有意义
    self._ormobj:set_index('time_index', 'time')
    self._ormobj:set_index("svr_index", 'svr_name', 'svr_id')

    self._ormobj:builder(adapter)

    return self
end

function M:write_log(info_t)
    info_t.time = time_util.time()
    info_t.svr_name = g_svr_name
    info_t.svr_id = g_svr_id
    self._ormobj:create_one_entry(info_t)
end

return M