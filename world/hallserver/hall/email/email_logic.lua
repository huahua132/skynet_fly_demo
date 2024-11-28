local log = require "skynet-fly.log"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local state_data = require "skynet-fly.hotfix.state_data"
local watch_syn_client = require "skynet-fly.rpc.watch_syn_client"
local email_msg = require "msg.email_msg"
local schema = hotfix_require "common.enum.schema"
local time_util = require "skynet-fly.utils.time_util"
local event_mgr = require "common.event_mgr"
local EVENT_ID = require "enum.EVENT_ID"
local errorcode = hotfix_require "common.enum.errorcode"

--interface
local player_interface = require "hall.player.interface"
local item_interface = require "hall.item.interface"

local table = table
local next = next
local tonumber = tonumber
local pairs = pairs

local M = {}

local g_email_entity = orm_table_client:instance("email")

local g_logic_info = state_data.alloc_table('g_logic_info')

--跨天事件
event_mgr.monitor(EVENT_ID.CROSS_DAY, function(player_id)
    local all_email_list = g_email_entity:get_entry(player_id)
    local cur_time = time_util.time()

    local del_guid_list = {}
    for i = 1, #all_email_list do
        local one_email = all_email_list[i]
        if cur_time > one_email.vaild_time then
            table.insert(del_guid_list, one_email.guid)
        end
    end

    if #del_guid_list <= 0 then return end

    local ret = g_email_entity:delete_entry_by_in(del_guid_list, player_id)
    if not ret then
        log.error_fmt("cross del email err ", player_id, del_guid_list)
    else
        g_logic_info.email_msg:del_email_notice(player_id, {
            guid_list = del_guid_list
        })
    end
end)

--检查邮件改变
local function check_email_change(old_email, new_email)
    if old_email.title ~= new_email.title then
        return true 
    end

    if old_email.content ~= new_email.content then
        return true
    end

    if old_email.vaild_time ~= new_email.vaild_time then
        return true
    end

    return false
end

--收到全局邮件同步
function M.on_recv_global_emails(all_global_emails)
    local old_global_emails = g_logic_info.all_global_emails
    local add_list = {}     --新增邮件
    local change_list = {}  --修改邮件
    local del_list = {}     --删除邮件

    local old_global_email_map = g_logic_info.all_global_email_map
    local new_global_email_map = {}
    for i = 1, #all_global_emails do
        local new_email = all_global_emails[i]
        local old_email = old_global_email_map[new_email.guid]
        if not old_email then
            table.insert(add_list, new_email)
        end

        new_global_email_map[new_email.guid] = new_email
    end

    for i = 1, #old_global_emails do
        local old_email = old_global_emails[i]
        local new_email = new_global_email_map[old_email.guid]
        if not new_email then
            table.insert(del_list, new_email)
        else
            if check_email_change(old_email, new_email) then
                table.insert(change_list, new_email)
            end
        end
    end
    
    g_logic_info.all_global_email_map = new_global_email_map
    g_logic_info.all_global_emails = all_global_emails

    local online_player_list = player_interface.get_online_list()
    for i = 1, #online_player_list do
        local player_id = online_player_list[i]
        --使用玩家的skynet.queue处理，如果玩家下线了，就不用处理了，等上线逻辑触发处理
        g_logic_info.interface_mgr:queue(player_id, M.change_global_email, player_id, add_list, change_list, del_list)
    end
end

local function handle_res_list(player_id, res_list, email_list, flag)
    for i = 1, #res_list do
        local res = res_list[i]
        local email = email_list[i]
        if not res then
            log.error_fmt("change_global_email %s err guid[%s]", flag, email.guid)
        else
            g_logic_info.email_msg:one_email_notice(player_id, email)
        end
    end
end

--处理玩家全服邮件变化
function M.change_global_email(player_id, add_list, change_list, del_list)
    local cur_time = time_util.time()

    --处理新增
    if add_list and #add_list > 0 then
        local new_email_list = {}
        for i = 1, #add_list do
            local one_email = add_list[i]
            table.insert(new_email_list, {
                player_id = player_id,
                guid = one_email.guid,
                email_type = schema.enums.email_type.GLOBAL,
                from_id = 0,
                title = one_email.title,
                content = one_email.content,
                create_time = cur_time,
                vaild_time = one_email.vaild_time,
                item_list = one_email.item_list,
            })
        end

        local res_list = g_email_entity:create_entry(new_email_list)
        handle_res_list(player_id, res_list, new_email_list, "add email")
    end

    if change_list and #change_list > 0 then
        --处理变更
        local change_email_list = {}
        for i = 1, #change_list do
            local one_email = change_list[i]
            table.insert(change_email_list, {
                player_id = player_id,
                guid = one_email.guid,
                email_type = schema.enums.email_type.GLOBAL,
                title = one_email.title,
                content = one_email.content,
                vaild_time = one_email.vaild_time,
            })
        end

        local res_list = g_email_entity:change_save_entry(change_email_list)
        handle_res_list(player_id, res_list, change_email_list, "change email")
    end

    if del_list and #del_list > 0 then
        --处理删除
        local del_email_list = {}
        for i = 1, #del_list do
            local one_email = del_list[i]
            table.insert(del_email_list, {
                player_id = player_id,
                guid = one_email.guid,
                email_type = schema.enums.email_type.GLOBAL,
                del_flag = 1,           --标记删除
            })
        end

        local res_list = g_email_entity:change_save_entry(del_email_list)
        handle_res_list(player_id, res_list, del_email_list, "del_flag email")
    end
end

--初始化
function M.init(interface_mgr)
    g_logic_info.all_global_emails = {} --全服邮件同步
    g_logic_info.all_global_email_map = {}
    g_logic_info.interface_mgr = interface_mgr
    watch_syn_client.watch("centerserver", "global_email", "email_logic", function(cluter_name, all_global_emails)
        M.on_recv_global_emails(all_global_emails)
    end)
    g_logic_info.email_msg = email_msg:new(interface_mgr)
end
---------------------------客户端事件----------------------------------
--登录
function M.on_login(player_id)
    local all_email_list = g_email_entity:get_entry(player_id)
    --过滤掉已标记删除的
    for i = #all_email_list, 1, -1 do
        local one_email = all_email_list[i]
        if one_email.del_flag == 1 then
            table.remove(all_email_list, i)
        end
    end
    g_logic_info.email_msg:all_email_notice(player_id, all_email_list)
    local email_map = {}
    for i = 1, #all_email_list do
        local one_email = all_email_list[i]
        email_map[one_email.guid] = one_email
    end
    --检查出来全服邮件
    local add_list = {}     --新增全服邮件
    local change_list = {}  --全服邮件内容改变
    local all_global_emails = g_logic_info.all_global_emails
    for i = 1, #all_global_emails do
        local one_email = all_global_emails[i]
        if not email_map[one_email.guid] then
            table.insert(add_list, one_email)
        else
            if check_email_change(email_map[one_email.guid], one_email) then
                table.insert(change_list, one_email)
            end
        end
    end
  
    M.change_global_email(player_id, add_list, change_list, nil)
end

--登出
function M.on_loginout(player_id)

end

--重连
function M.on_reconnect(player_id)
    M.on_login(player_id)
end

---------------------------客户端消息----------------------------------
--读取邮件
function M.do_read_email(player_id, pack_body)
    local guid_list = pack_body.guid_list
    if #guid_list <= 0 then
        return nil,  errorcode.REQ_PARAM_ERR, "guid_list len <= 0"
    end
    for i = 1, #guid_list do
        local guid = tonumber(guid_list[i])
        if not guid then
            return nil, errorcode.REQ_PARAM_ERR, "guid not number"
        end
        guid_list[i] = guid
    end

    g_email_entity:read_email_list(player_id, guid_list)

    g_logic_info.email_msg:read_email_res(player_id, {
        guid_list = guid_list,
    })

    return true
end

--领取道具奖励
function M.do_item_list_email(player_id, pack_body)
    local guid_list = pack_body.guid_list
    if #guid_list <= 0 then
        return nil,  errorcode.REQ_PARAM_ERR, "guid_list len <= 0"
    end
    for i = 1, #guid_list do
        local guid = tonumber(guid_list[i])
        if not guid then
            return nil, errorcode.REQ_PARAM_ERR, "guid not number"
        end
        guid_list[i] = guid
    end

    local item_list_ret = g_email_entity:reward_item_list(player_id, guid_list)

    local ret_guid_list = {}
    for i = 1, #item_list_ret do
        local one_ret = item_list_ret[i]
        table.insert(ret_guid_list, one_ret.guid)
        local item_list = one_ret.item_list
        item_interface.add_item_list(player_id, item_list)
    end

    g_logic_info.email_msg:item_list_email_res(player_id, {
        guid_list = ret_guid_list,
    })

    return true
end

--删除邮件
function M.do_del_email(player_id, pack_body)
    local guid_list = pack_body.guid_list
    if #guid_list <= 0 then
        return nil,  errorcode.REQ_PARAM_ERR, "guid_list len <= 0"
    end
    for i = 1, #guid_list do
        local guid = tonumber(guid_list[i])
        if not guid then
            return nil, errorcode.REQ_PARAM_ERR, "guid not number"
        end
        guid_list[i] = guid
    end

    g_email_entity:del_email_list(player_id, guid_list)

    g_logic_info.email_msg:del_email_res(player_id, {
        guid_list = guid_list,
    })

    return true
end


--------------------------------------------GM-----------------------------------------
function M.gm_get_list(player_id)
    player_id = tonumber(player_id)
    if not player_id then
        return nil, "not player_id"
    end

    return g_email_entity:get_entry(player_id)
end

function M.gm_item_list(player_id, ...)
    player_id = tonumber(player_id)
    if not player_id then
        return nil, "not player_id"
    end

    local guid_list = {...}
    if #guid_list <= 0 then
        return nil, "not guid"
    end
    for i = 1, #guid_list do
        local guid = tonumber(guid_list[i])
        if not guid then
            return nil, "guid not number"
        end
        guid_list[i] = guid
    end

    return M.do_item_list_email(player_id, {
        guid_list = guid_list,
    })
end

return M