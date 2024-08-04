local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local skynet = require "skynet"
local env_util = require "skynet-fly.utils.env_util"

local svr_id = env_util.get_svr_id()

local pairs = pairs
local ipairs = ipairs
local table = table
local assert = assert

local g_ormobj = nil

local M = {}
local handle = {}

--玩家信息
function M.init()
    local adapter = ormadapter_mysql:new("hall_" .. svr_id)
    g_ormobj = ormtable:new("player")
    :int64("player_id")         --玩家id
    :string32("nickname")       --昵称
    :int8("sex")                --性别
    :uint16("level")            --等级
    :uint16("viplevel")         --vip等级
    :string256("head_url")      --头像url
    :int64("create_time")       --创建时间
    :int64("last_login_time")   --最后登录时间
    :int64("last_logout_time")  --最后登出时间
    :set_keys("player_id")
    :set_cache(60 * 60 * 100, 500, 100000)    --缓存1个小时，5秒同步一次更改，最大缓存10万条数据
    :builder(adapter)
    return g_ormobj
end

function handle.get_players_info(player_list, filed_map)
    local ret_map = {}
    for i = 1, #player_list do
        local player_id = player_list[i]
        local entry = g_ormobj:get_one_entry(player_id)
        local entry_data = entry:get_entry_data()

        local info = {}
        for field in pairs(filed_map) do
            assert(entry_data[field], "get_players_info filed not exists :" .. field)
            info[field] = entry_data[field]
        end
        ret_map[player_id] = info
    end

    return ret_map
end

M.handle = handle

return M