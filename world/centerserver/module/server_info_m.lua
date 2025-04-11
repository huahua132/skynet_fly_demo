local log = require "skynet-fly.log"
local orm_table_client = require "skynet-fly.client.orm_table_client"
local frpc_client = require "skynet-fly.client.frpc_client"
local queue = require "skynet.queue"()
local skynet = require "skynet"
local timer = require "skynet-fly.timer"
local SERVER_STATUS = require "common.enum.SERVER_STATUS"
local string_util = require "skynet-fly.utils.string_util"
local watch_server = require "skynet-fly.rpc.watch_server"
local SYN_CHANNEL_NAME = require "common.enum.SYN_CHANNEL_NAME"
local SERVER_SWITCH_STATUS = require "common.enum.SERVER_SWITCH_STATUS"

local ipairs = ipairs
local pairs = pairs
local tunpack = table.unpack
local tonumber = tonumber

local g_server_info_client = orm_table_client:new("server_info")   --server_info 对应 load_mods.lua orm_table_m 中写的instance_name
local g_white_client = orm_table_client:new("white")

local g_server_info_map = {}
local g_white_map = {}
local g_timer = nil

local function change_status(cluster_name, server_info, status)
    log.info_fmt("change_status cluster_name[%s] status[%s]", cluster_name, status)
    g_server_info_client:change_status(cluster_name, status)
    server_info.status = status

    watch_server.pubsyn(SYN_CHANNEL_NAME.server_info .. cluster_name, cluster_name, server_info)
end

local function change_switch(cluster_name, server_info, switch)
    log.info_fmt("change_switch cluster_name[%s] switch[%s]", cluster_name, switch)
    g_server_info_client:change_switch(cluster_name, switch)
    server_info.switch = switch
    watch_server.pubsyn(SYN_CHANNEL_NAME.server_info .. cluster_name, cluster_name, server_info)
    return true
end

local function up_server(svr_name, svr_id)
    local cluster_name = svr_name .. '-' .. svr_id
    local server_info = g_server_info_map[cluster_name]
    if not server_info then
        server_info = g_server_info_client:get_server_info(cluster_name)
    end

    change_status(cluster_name, server_info, SERVER_STATUS.OPEN)
end

frpc_client:watch_all_up(nil, function(svr_name, svr_id)
    queue(up_server, svr_name, svr_id)
end)

local function check_loop()
    for cluster_name, server_info in pairs(g_server_info_map) do
        local svr_name, svr_id = tunpack(string_util.split(cluster_name, '-'))
        svr_id = tonumber(svr_id)
        if frpc_client:is_active(svr_name, svr_id) then
            if server_info.status ~= SERVER_STATUS.OPEN then 
                change_status(cluster_name, server_info, SERVER_STATUS.OPEN)
            end
        else
            if server_info.status ~= SERVER_STATUS.CLOSE then
                change_status(cluster_name, server_info, SERVER_STATUS.CLOSE)
            end
        end
    end
end

local CMD = {}

--改变开关状态
function CMD.change_switch(cluster_name, switch)
    local server_info = g_server_info_map[cluster_name]
    if not server_info then
        log.error_fmt("change_switch not server_info cluster_name[%s] switch[%s]", cluster_name, switch)
        return false
    end
    if not SERVER_SWITCH_STATUS[switch] then
        log.error_fmt("change_switch not status cluster_name[%s] switch[%s]", cluster_name, switch)
        return false
    end
    return queue(change_switch, cluster_name, server_info, switch)
end

local function change_all_switch(switch)
    for cluster_name, server_info in pairs(g_server_info_map) do
        if server_info.switch ~= switch then
            change_switch(cluster_name, server_info, switch)
        end
    end

    return true
end
--一键改变开关状态
function CMD.change_all_switch(switch)
    return queue(change_all_switch, switch)
end

local function add_white(player_id)
    if g_white_map[player_id] then
        log.warn_fmt("add_white exists player_id[%s]", player_id)
        return false
    end

    if not g_white_client:create_one_entry({player_id = player_id}) then
        return false
    end

    g_white_map[player_id] = true
    watch_server.pubsyn(SYN_CHANNEL_NAME.white_info, g_white_map)
    return true
end

local function del_white(player_id)
    if not g_white_map[player_id] then
        log.warn_fmt("del_white not exists player_id[%s]", player_id)
        return false
    end

    if not g_white_client:delete_entry(player_id) then
        return false
    end

    g_white_map[player_id] = nil
    watch_server.pubsyn(SYN_CHANNEL_NAME.white_info, g_white_map)
    return true
end

--添加白名单
function CMD.add_white(player_id)
    return queue(add_white, player_id)
end

--移除白名单
function CMD.del_white(player_id)
    return queue(del_white, player_id)
end

function CMD.start()
    skynet.fork(function()
        queue(function()
            local all_server_info = g_server_info_client:get_all_entry()
            for _, one_info in ipairs(all_server_info) do
                g_server_info_map[one_info.cluster_name] = one_info
                watch_server.pubsyn(SYN_CHANNEL_NAME.server_info .. one_info.cluster_name, one_info.cluster_name, one_info)
            end

            local all_white_info = g_white_client:get_all_entry()
            for _, one_info in ipairs(all_white_info) do
                g_white_map[one_info.player_id] = true
            end
            watch_server.pubsyn(SYN_CHANNEL_NAME.white_info, g_white_map)
        end)
    end)

    g_timer = timer:new(timer.second * 5, 0, function()
        queue(check_loop)
    end):after_next()

    return true
end

function CMD.fix_exit()
    if g_timer then
        g_timer:cancel()
    end
end

function CMD.exit()
    return true
end

return CMD