local log = require "skynet-fly.log"
local skynet = require "skynet"
local watch_syn_client = require "skynet-fly.rpc.watch_syn_client"
local SYN_CHANNEL_NAME = require "common.enum.SYN_CHANNEL_NAME"
local frpc_client = require "skynet-fly.client.frpc_client"
local white_helper = require "common.white_helper"

local pairs = pairs
local tinsert = table.insert

local CMD = {}

local g_server_info_map = {}

--获取所有服务信息
function CMD.get_all_server_info()
    return g_server_info_map
end

--修改服务开关状态
function CMD.change_switch(cluster_name, switch)
    return frpc_client:instance('centerserver', 'server_info_m'):one_balance_call('change_switch', cluster_name, switch)
end

--获取白名单map
function CMD.get_white_map()
    local map = white_helper.get_white_map()
    local list = {}
    for k,v in pairs(map) do
        tinsert(list, k)
    end
    return list
end

--添加白名单
function CMD.add_white(player_id)
    return frpc_client:instance('centerserver', 'server_info_m'):one_balance_call('add_white', player_id)
end

--删除白名单
function CMD.del_white(player_id)
    return frpc_client:instance('centerserver', 'server_info_m'):one_balance_call('del_white', player_id)
end

function CMD.start()
    watch_syn_client.pwatch("centerserver", SYN_CHANNEL_NAME.server_info .. '*', "handle_name_1", function(_, cluster_name, server_info)
        g_server_info_map[cluster_name] = server_info
    end)

    return true
end

function CMD.fix_exit()
    watch_syn_client.unpwatch("centerserver", SYN_CHANNEL_NAME.server_info .. '*', "handle_name_1")
    return true
end

function CMD.exit()
    return true
end

return CMD