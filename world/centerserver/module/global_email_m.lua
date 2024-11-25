local log = require "skynet-fly.log"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local watch_server = require "skynet-fly.rpc.watch_server"
local timer_point = require "skynet-fly.time_extend.timer_point"
local time_util = require "skynet-fly.utils.time_util"
local snowflake = require "skynet-fly.snowflake"
local skynet = require "skynet"

local pairs = pairs

local g_global_email_client = orm_table_client:new("global_email")   --global_email 对应 load_mods.lua orm_table_m 中写的instance_name
local g_timer = nil 

--同步全服邮件
local function syn_all_email()
    local all_email = g_global_email_client:get_all_entry()
    watch_server.pubsyn("global_email", all_email)
end

--定时删除过期邮件
local function remote_invaild_email()
    local all_email = g_global_email_client:get_all_entry()
    local is_del = false
    local cur_time = time_util.time()
    for _, email in pairs(all_email) do
        local guid = email.guid
        local vaild_time = email.vaild_time
        if cur_time > vaild_time then
            is_del = true
            g_global_email_client:delete_entry(guid)
        end
    end

    if not is_del then return end
    syn_all_email()
end

local CMD = {}
--新增邮件
function CMD.add(title, content, item_list, vaild_time)
    local guid = snowflake.new_guid()
    local new_email = {
        guid = guid,
        title = title,
        content = content,
        item_list = item_list,
        vaild_time = vaild_time,
    }
    g_global_email_client:create_one_entry(new_email)
    syn_all_email()
    return true
end
--删除邮件
function CMD.del(guid)
    local ret = g_global_email_client:delete_entry(guid)
    if not ret then return end
    syn_all_email()
    return true
end
--改变邮件
function CMD.change(guid, title, content, item_list, vaild_time)
    local email = g_global_email_client:get_one_entry(guid)
    if not email then
        return false
    end

    email.title = title
    email.content = content
    email.item_list = item_list
    email.vaild_time = vaild_time

    local ret = g_global_email_client:change_save_one_entry(email)
    if not ret then return end
    syn_all_email()
    return ret
end

function CMD.start()
    g_timer = timer_point:new(timer_point.EVERY_DAY)  --每天
    :set_hour(5)                            --5点
    :set_min(30)                            --30分
    :set_sec(30)                            --30秒
    :builder(remote_invaild_email)          --执行一次

    skynet.fork(function()
        syn_all_email()
    end)
    return true
end

function CMD.fix_exit()
    g_timer:cancel()
end

function CMD.exit()
    return true
end

return CMD