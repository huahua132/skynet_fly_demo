local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local skynet = require "skynet"
local env_util = require "skynet-fly.utils.env_util"
local schema = hotfix_require "common.enum.schema"

local ipairs = ipairs
local table = table

local g_ormobj = nil

local M = {}
local handle = {}

--邮件
function M.init()
    local adapter = ormadapter_mysql:new("orm_db")
    ---@class email_entity @邮件表
    ---@field player_id number @玩家id
    ---@field guid number @邮件guid
    ---@field email_type number @邮件类型 1全服邮件 2系统邮件 3好友
    ---@field from_id number @来源ID   好友ID
    ---@field title string @标题
    ---@field content string @内容
    ---@field create_time number @创建时间
    ---@field vaild_time number @有效时间
    ---@field item_list item[] @道具奖励
    ---@field read_flag number @已读标记 1已读 0未读
    ---@field item_flag number @道具可领标记  1已领取 0未领取(item_list有东西才能领取)
    ---@field del_flag number @删除标记 全服邮件用(避免重复创建)
    g_ormobj = ormtable:new("email")
    :int64("player_id")
    :int64("guid")
    :uint8("email_type")
    :int64("from_id")
    :string256("title")
    :string8192("content")
    :int64("create_time")
    :int64("vaild_time")
    :table("item_list")
    :int8("read_flag")
    :int8("item_flag")
    :int8("del_flag")
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