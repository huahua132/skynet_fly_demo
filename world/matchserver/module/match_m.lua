local log = require "skynet-fly.log"
local frpc_client = require "skynet-fly.client.frpc_client"
local skynet = require "skynet"
local timer = require "skynet-fly.timer"
local redis = require "skynet-fly.db.redisf"
local string_util = require "skynet-fly.utils.string_util"
local time_util = require "skynet-fly.utils.time_util"
local ENUM = require "common.enum.ENUM"
local GAME_ID_ENUM = require "common.enum.GAME_ID_ENUM"
local module_info = require "skynet-fly.etc.module_info"
local watch_syn_client = require "skynet-fly.rpc.watch_syn_client"
local SYN_CHANNEL_NAME = require "common.enum.SYN_CHANNEL_NAME"
local errorcode = require "common.enum.errorcode"
local player_rpc = require "common.rpc.hallserver.player"
local match_conf = hotfix_require "common.conf.match_conf"

local tonumber = tonumber
local ipairs = ipairs
local table = table
local string = string
local next = next
local pairs = pairs

--匹配集合
local function match_key(play_type)
    local cfg = module_info.get_cfg()
    return cfg.instance_name .. ":match:" .. play_type
end

--匹配成功的结果信息
local function match_result_key(session_id)
    local cfg = module_info.get_cfg()
    return cfg.instance_name .. ":match:result:" .. session_id
end

--匹配成功锁 (匹配成功后 对局没有确定是否加入时，不能再进行匹配)
local function match_succ_lock_key(player_id)
    return "match_lock:" .. player_id
end

local g_game_cli = nil
local g_match_loop_timer = nil

local g_gameinfo_map = {}

local function syn_game_info(cluster_name, info)
    local spstr = string_util.split(cluster_name, ':')
    local svr_name, svr_id = spstr[1], tonumber(spstr[2])

    g_gameinfo_map[cluster_name] = {
        host = info.host,
        cur_player_num = info.cur_player_num,
        cur_table_num = info.cur_table_num,
        max_table_num = info.max_table_num,
        svr_name = svr_name,
        svr_id = svr_id,
    }
end

local function get_game_node()
    local min_table_v = nil
    for _,v in pairs(g_gameinfo_map) do
        if not min_table_v or v.cur_table_num < min_table_v.cur_table_num and frpc_client:is_active(v.svr_name, v.svr_id) then
            min_table_v = v
        end
    end

    if min_table_v and min_table_v.cur_table_num < min_table_v.max_table_num then
        return min_table_v
    end

    return nil
end

local function match_one(play_type)
    local game_node_info = get_game_node()
    if not game_node_info then
        return
    end
    
    local cur_time = time_util.time()
    local redis_cli = redis.instance("global")
    local member_list = redis_cli:zrevrange(match_key(play_type), 0, 999)
    for i = 1,#member_list, 2 do
        local match_list = {tonumber(member_list[i]), tonumber(member_list[i + 1])}
        if #match_list ~= 2 then
            break
        end

        --匹配成功，请求游戏服创建房间
        g_game_cli:set_svr_id(game_node_info.svr_id)
        local ret = g_game_cli:mod_call("createtable", match_list, cur_time, play_type) --创建桌子
        --log.info("match_loop >>> ", ret)
        if ret and #ret.result > 0 then
            local table_id = ret.result[1]
            local token_list = ret.result[2]
            --清除出redis匹配集合
            local script_str = [[
                local key = KEYS[1]
                for i = 1,#ARGV do
                    local player_id = ARGV[i]
                    local rank = redis.call('zrank', key, player_id)
                    if not rank then
                        return 0
                    end
                end

                for i = 1,#ARGV do
                    redis.call('zrem', key, ARGV[i])
                end
                
                return 1
            ]]

            local ret = redis_cli:script_run(script_str, 1, match_key(play_type), table.unpack(match_list))
            --log.info("ret >>>> ", ret)
            if ret == 1 then
                local session_id = string.format("%s-%s-%s-%s", game_node_info.svr_name, game_node_info.svr_id, table_id, time_util.time())
                --记录匹配信息
                local key = match_result_key(session_id)
                local args = {}
                for j,player_id in ipairs(match_list) do
                    table.insert(args, {"hset", key, "token:" .. player_id, token_list[j]})   --token
                    table.insert(args, {"hset", key, "accept:" .. player_id, 0})              --是否同意进入  
                    table.insert(args, {"set", match_succ_lock_key(player_id), 1, "EX", ENUM.MATCH_ACCEPT_TIME_OUT})  --匹配锁
                end
                table.insert(args, {"hset", key, "total_cnt", #match_list})                   --总人数
                table.insert(args, {"hset", key, "accept_cnt", 0})                            --接受人数
                table.insert(args, {"hset", key, "host", game_node_info.host})                --host
                table.insert(args, {"hset", key, "create_time", cur_time})                    --创建时间
                table.insert(args, {"expire", key, ENUM.MATCH_ACCEPT_TIME_OUT})               --过期时间
                local ret = redis_cli:pipeline(args,{})
                if ret[#ret].out == 1 then
                    --通知大厅服，匹配成功了
                    for j,player_id in ipairs(match_list) do
                        --log.info("get_svr_id_by_player_id >>> ",player_id, svr_id)
                        player_rpc.send_player_hall(player_id, "match_succ", player_id, session_id, GAME_ID_ENUM[module_info.get_cfg().instance_name], ENUM.MATCH_ACCEPT_TIME_OUT)
                    end
                end
            else
                --说明有人取消匹配了
                log.info("have player cancel match >>> ", match_list)
            end
        else
            log.warn("game server create table fail ", game_node_info.svr_id)
        end
    end
end

local function match_loop()
    local play_type_list = match_conf.get_play_type_list(GAME_ID_ENUM[module_info.get_cfg().instance_name])
    
    for i = 1, #play_type_list do
        local play_type = play_type_list[i]
        match_one(play_type)
    end
end

local CMD = {}

--匹配
function CMD.match(player_id, play_type)
    --log.info("match1 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", player_id)
    local script_str = [[
        local player_id = KEYS[1]
        local score = ARGV[1]
        local key = KEYS[2]
        local match_lock = KEYS[3]

        if redis.call('exists', match_lock) == 1 then
            return 0
        end
        
        local rank = redis.call('zrank', key, player_id)
        if rank then
            return 0
        end

        redis.call('zadd', key, score, player_id)
        return 1
    ]]

    local ret = redis.instance("global"):script_run(script_str, 3, player_id, match_key(play_type), match_succ_lock_key(player_id), 0)
    --log.info("match2>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", ret)
    if ret ~= 1 then
        return nil, errorcode.MATCHING, "matching"
    end

    return true
end

--取消匹配
function CMD.cancel_match(player_id, play_type)
    --log.info("cancel_match >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", player_id)
    if redis.instance("global"):zrem(match_key(play_type), player_id) == 1 then
        return true
    end

    return false
end

--接受对局
function CMD.accept_session(player_id, session_id)
    --log.info("accept_session >>>>>>>>>>>>>>>>>>>>>>>>>>>>>", player_id, session_id)

    local result_key = match_result_key(session_id)
    local script_str = [[
        local result_key = KEYS[1]
        local player_id = KEYS[2]
        if redis.call('exists', result_key) ~= 1 then
            return 1
        end

        local accept_status = tonumber(redis.call('hget', result_key, 'accept:' .. player_id))
        if not accept_status or accept_status == 1 then
            return 2
        end

        redis.call('hset', result_key, 'accept:' .. player_id, 1)
        local accept_cnt = tonumber(redis.call('hincrby', result_key, 'accept_cnt', 1))
        local total_cnt = tonumber(redis.call('hget', result_key, 'total_cnt'))
        if accept_cnt == total_cnt then
            return redis.call('hgetall', result_key)
        end

        return 3
    ]]

    local ret = redis.instance("global"):script_run(script_str, 2, result_key, player_id)
    --log.info("accept_session2 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>", player_id, session_id, ret)
    if not ret or ret == 1 or ret == 2 then
        return false
    elseif ret == 3 then
        return true
    else
        skynet.fork(function()
            local result = {}
            for i = 1, #ret, 2 do
                result[ret[i]] = ret[i + 1]
            end

            local host = result.host
            local create_time = result.create_time
            local spstr = string_util.split(session_id, '-')
            local svr_name, svr_id, table_id = spstr[1], tonumber(spstr[2]), spstr[3]

            local game_info_map = {}

            for k,token in pairs(result) do
                local b,e = string.find(k, 'token:', nil, false)
                if b then
                    local l_player_id = tonumber(k:sub(e + 1))
                    game_info_map[l_player_id] = {
                        host = host,
                        table_id = table_id,
                        svr_name = svr_name,
                        svr_id = svr_id,
                        token = token,
                        create_time = create_time,
                    }
                end
            end

            --通知游戏服记录游戏房间信息
            g_game_cli:set_svr_id(svr_id)
            local ret = g_game_cli:mod_call("set_game_room_info", game_info_map) --记录游戏房间信息
            --log.info("set_game_room_info ret >>>", ret)
            if not ret then
                log.warn("set_game_room_info err ", svr_name, svr_id, table_id)
                return
            end

            for l_player_id,info in pairs(game_info_map) do
                --通知加入对局
                --log.info("get_svr_id_by_player_id >>> ",l_player_id, svr_id)
                player_rpc.send_player_hall(l_player_id, "match_join_game", l_player_id, info.token, host, table_id)
            end
        end)
        return true
    end
end

function CMD.start(config)
    --log.info("start match_m", config, module_info.get_cfg())
    
    skynet.fork(function()
        g_game_cli = frpc_client:new(frpc_client.FRPC_MODE.byid, config.instance_name, "room_game_alloc_m")
        --匹配循环
        g_match_loop_timer = timer:new(timer.second * 5, 0, match_loop)
        --执行完再注册下一次
        g_match_loop_timer:after_next()
    end)

    watch_syn_client.watch(config.instance_name, SYN_CHANNEL_NAME.alloc_info, "syn_game_info", syn_game_info)
    
    return true
end

function CMD.fix_exit()
    --确定退出了，就可以取消定时器了
    g_match_loop_timer:cancel()
end

function CMD.exit()
    return true
end

return CMD