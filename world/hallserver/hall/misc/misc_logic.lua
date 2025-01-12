local log = require "skynet-fly.log"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local time_util = require "skynet-fly.utils.time_util"
local misc_conf = hotfix_require "hall.misc.misc_conf"
local schema = hotfix_require "common.enum.schema"

--邮件接口
local email_interface = require "hall.email.interface"
local player_interface = require "hall.player.interface"

local g_misc_entity = orm_table_client:instance("misc")

local M = {}

local os = os
local math = math

---------------------------客户端事件----------------------------------
--初始化
function M.init(interface_mgr)

end
--玩家登录
function M.on_login(player_id, is_jump_join)
    if is_jump_join then return end
    local misc_info = g_misc_entity:get_one_entry(player_id)
    if not misc_info then
        misc_info = g_misc_entity:create_one_entry({player_id = player_id})
    end
    
    if time_util.is_cross_day(misc_info.login_reward_time) then
        local param = misc_conf.get_param()
        local cur_time = time_util.time()
        local title_params = {
            date = os.date("%Y%m%d-%H%M%S", cur_time),
        }

        local player_info = player_interface.get_info(player_id)

        local sign_day = time_util.diff_day(player_info.create_time, cur_time) + 1
        local content_params = {
            sign_day = sign_day,
        }
        if email_interface.add_sys_email(player_id, schema.enums.sys_email_id.LOGIN_REWARD, param.login_rewards, title_params, content_params) then
            g_misc_entity:change_save_one_entry({player_id = player_id, login_reward_time = cur_time})
        end
    end
end

--玩家重连
function M.on_reconnect(player_id)
    
end

--玩家掉线
function M.on_disconnect(player_id)
    
end

--玩家登出
function M.on_loginout(player_id, is_jump_exit)
    
end

return M