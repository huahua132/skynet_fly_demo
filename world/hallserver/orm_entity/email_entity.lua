local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local skynet = require "skynet"
local env_util = require "skynet-fly.utils.env_util"
local schema = hotfix_require "common.enum.schema"

local svr_id = env_util.get_svr_id()

local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

--邮件
function M.init()
    local adapter = ormadapter_mysql:new("hall_" .. svr_id)
    g_ormobj = ormtable:new("email")
    :int64("player_id")         --玩家id
    :int64("guid")              --邮件guid
    :uint8("email_type")        --邮件类型 1全服邮件 2系统邮件 3好友
    :int64("from_id")           --来源ID   好友ID
    :string256("title")         --标题
    :string8192("content")      --内容
    :int64("create_time")       --创建时间
    :int64("vaild_time")        --有效时间
    :table("item_list")         --道具奖励
    :int8("read_flag")          --已读标记 1已读 0未读
    :int8("item_flag")          --道具可领标记  1已领取 0未领取(item_list有东西才能领取)
    :int8("del_flag")           --删除标记 全服邮件用(避免重复创建)
    :set_keys("player_id", "guid")
    :set_cache(60 * 60 * 100, 500, 100000)    --缓存1个小时，5秒同步一次更改，最大缓存10万条数据
    :builder(adapter)
    return g_ormobj
end

--标记已读
function handle.read_email_list(player_id, guid_list)
    if #guid_list <= 0 then return true end

    local entry_list = g_ormobj:get_entry_by_in(guid_list, player_id)
    for i = 1, #entry_list do
        local entry = entry_list[i]
        entry:set('read_flag', 1)   --标记已读
    end

    return true
end

--标记道具已领取，并返回道具列表
function handle.reward_item_list(player_id, guid_list)
    if #guid_list <= 0 then return {} end
    
    local item_list_ret = {}
    local entry_list = g_ormobj:get_entry_by_in(guid_list, player_id)
    for i = 1, #entry_list do
        local entry = entry_list[i]
        local guid = entry:get('guid')
        local item_flag = entry:get('item_flag')
        local item_list = entry:get('item_list')
        if #item_list > 0 and item_flag ~= 1 then
            table.insert(item_list_ret, {
                guid = guid,
                item_list = item_list,
            })
            entry:set('item_flag', 1)
        end
    end

    return item_list_ret
end

--删除邮件
function handle.del_email_list(player_id, guid_list)
    if #guid_list <= 0 then return true end

    local entry_list = g_ormobj:get_entry_by_in(guid_list, player_id)

    local del_guid_list = {}
    for i = 1, #entry_list do
        local entry = entry_list[i]
        local email_type = entry:get('email_type')
        if email_type == schema.enums.email_type.GLOBAL then        --全服邮件标记删除就行
            entry:set('del_flag', 1)
        else
            table.insert(del_guid_list, entry:get('guid'))
        end
    end

    if #del_guid_list > 0 then
        g_ormobj:delete_entry_by_in(del_guid_list, player_id)
    end

    return true
end

M.handle = handle

return M