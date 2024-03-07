local log = require "skynet-fly.log"
local cluster_client = require "skynet-fly.client.cluster_client"
local skynet = require "skynet"
local timer = require "skynet-fly.timer"
local redis = require "skynet-fly.db.redisf"
local string_util = require "skynet-fly.utils.string_util"

local tonumber = tonumber
local ipairs = ipairs
local table = table

local g_game_cli = nil
local g_timer_obj = nil
local g_match_loop_timer = nil

local g_gameinfolist = {}

local function syn_game_info()
    --给所有节点发
    local gameinfo_list = {}
    local ret = g_game_cli:all_mod_call("get_info")
    for _,v in ipairs(ret) do
        local cluster_name = v.cluster_name
        local spstr = string_util.split(cluster_name, ':')
        local svr_name, svr_id = tonumber(spstr[1]), tonumber(spstr[2])
        local result = v.result
        local info = result[1]
        table.insert(gameinfo_list, {
            host = info.host,
            cur_player_num = info.cur_player_num,
            cur_table_num = info.cur_table_num,
            max_table_num = info.max_table_num,
            svr_name = svr_name,
            svr_id = svr_id,
        })
    end

    g_gameinfolist = gameinfo_list
end

local function get_game_node()
    local min_table_v = nil
    for _,v in ipairs(g_gameinfolist) do
        if not min_table_v or v.cur_table_num < min_table_v.cur_table_num then
            min_table_v = v
        end
    end

    if min_table_v and min_table_v.cur_table_num < min_table_v.max_table_num then
        return min_table_v
    end

    return nil
end

local function match_loop()
    local game_node_info = get_game_node()
    if not game_node_info then
        return
    end

    local member_list = redis.instance("global"):zrevrange("match", 0, 999)
    for i = 1,#member_list, 2 do
        local match_list = {tonumber(member_list[i]), tonumber(member_list[i + 1])}
        if #match_list ~= 2 then
            break
        end

        --匹配成功，请求游戏服创建房间
        g_game_cli:set_svr_id(game_node_info.svr_id)
        local table_id, token_list = g_game_cli:byid_mod_call("createtable", member_list) --创建桌子
        log.info("match_loop >>> ", table_id, token_list)

        for _,player_id in ipairs(match_list) do
            
        end
    end
end

local CMD = {}

--匹配
function CMD.match(player_id)
    local script_str = [[
        local player_id = KEYS[1]
        local score = ARGV[1]
        local key = "match"
        local rank = redis.call('zrank', key, player_id)
        if rank then
            return 0
        end

        redis.call('zadd', key, score, player_id)
        return 1
    ]]

    local ret = redis.instance("global"):script_run(script_str, 1, player_id, 0)
    if ret ~= 1 then
        return nil
    end

    return true
end

--取消匹配
function CMD.cancel_match(player_id)
    redis.instance("global"):zrem("match", player_id)
end

function CMD.start(config)
    log.info("start match_m", config)
    
    skynet.fork(function()
        g_game_cli = cluster_client:new(config.instance_name, "room_game_alloc_m")
        --注册一个5秒一次的定时器
        g_timer_obj = timer:new(timer.second * 5, 0, syn_game_info)

        CMD.match(1000)
        CMD.match(1001)
        --匹配循环
        g_match_loop_timer = timer:new(timer.second * 5, 0, match_loop)
        --执行完再注册下一次
        g_match_loop_timer:after_next()
    end)
    
    return true
end

function CMD.fix_exit()
    --确定退出了，就可以取消定时器了
    g_timer_obj:cancel()
    g_match_loop_timer:cancel()
end

function CMD.exit()
    return true
end

return CMD