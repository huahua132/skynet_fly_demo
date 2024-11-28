
local email_logic = hotfix_require "hall.email.email_logic"

local PACK = require "common.pack_helper".PACK

local M = {}

function M.init(interface_mgr)
    email_logic.init(interface_mgr)
end

function M.on_login(player_id)
    email_logic.on_login(player_id)
end

function M.on_loginout(player_id)
    email_logic.on_loginout(player_id)
end

function M.on_reconnect(player_id)
    email_logic.on_reconnect(player_id)
end

M.handle = {
    --读取邮件
    [PACK.hallserver_email.ReadEmailReq] = function(player_id, pack_id, pack_body)
        email_logic.do_read_email(player_id, pack_body)
    end,
    --领取道具列表
    [PACK.hallserver_email.ItemListEmailReq] = function(player_id, pack_id, pack_body)
        email_logic.do_item_list_email(player_id, pack_body)
    end,
    --删除邮件
    [PACK.hallserver_email.DelEmailReq] = function(player_id, pack_id, pack_body)
        email_logic.do_del_email(player_id, pack_body)
    end,
}

local CMD = {}

M.register_cmd = CMD


local gmCMD = {
    ['email:get_list'] = {
        func = email_logic.gm_get_list,
        help_des = "查询玩家邮件列表 arg1=player_id"
    },
    ['email:item_list_req'] = {
        func = email_logic.gm_item_list,
        help_des = "领取邮件道具奖励 arg1=player_id arg2=guid1 arg3=guid2"
    }
}

M.gm_cmd = gmCMD

return M