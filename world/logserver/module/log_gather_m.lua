local log = require "skynet-fly.log"
local watch_syn_client = require "skynet-fly.rpc.watch_syn_client"
local SYN_CHANNEL_NAME = require "common.enum.SYN_CHANNEL_NAME"
local ormtable = require "skynet-fly.db.orm.ormtable"
local ormadapter_mysql = require "skynet-fly.db.ormadapter.ormadapter_mysql"
local skynet_util = require "skynet-fly.utils.skynet_util"
local mysqli = require "skynet-fly.db.mysqli"
local queue = require "skynet.queue"()
local frpc_client = require "skynet-fly.client.frpc_client"
local string_util = require "skynet-fly.utils.string_util"
local wait = require "skynet-fly.time_extend.wait":new()
local time_util = require "skynet-fly.utils.time_util"
local json = require "cjson.safe"
local timer = require "skynet-fly.timer"
local timer_point = require "skynet-fly.time_extend.timer_point"
local skynet = require "skynet"

local pairs = pairs
local ipairs = ipairs
local tunpack = table.unpack
local tonumber = tonumber
local os = os
local math = math
local string = string
local table = table

local g_IGNORE_MAP = {
    ['_log_name'] = true
}
local g_gater_ormobj = nil
local g_orm_map = {}
local g_log_info_map = {}
local g_timer = nil
local g_timer_point = nil
local g_loop_timer_map = {}

local g_orm_type_strs = {}
do
    for str, type in pairs(ormtable.FIELD_TYPE) do
        g_orm_type_strs[type] = str
    end
end

local function create_orm_obj(use_log_info, mysqlcli)
    local field_list = use_log_info.field_list
    local field_map = use_log_info.field_map
    local key_list = use_log_info.key_list
    local indexs_list = use_log_info.indexs_list
    local tab_name = use_log_info.tab_name
    --创建或者修改orm
    local adapter = ormadapter_mysql:new(nil, mysqlcli)
    local ormobj = ormtable:new(tab_name)
    --设置字段
    for _, field_name in ipairs(field_list) do
        if not g_IGNORE_MAP[field_name] then
            local field_type = field_map[field_name]
            local type_str = g_orm_type_strs[field_type]
            ormobj[type_str](ormobj, field_name)
        end
    end
    --设置主键
    ormobj:set_keys(tunpack(key_list))
    --设置普通索引
    for index_name, list in pairs(indexs_list) do
        ormobj:set_index(index_name, tunpack(list))
    end
    --构建
    ormobj:builder(adapter)

    g_orm_map[tab_name] = ormobj
    g_log_info_map[tab_name] = use_log_info
    wait:wakeup(tab_name)
end

--创建采集循环
local function create_gather_loop(cluster_name, use_log_info)
    local file_name = use_log_info.file_name
    local entry = g_gater_ormobj:get_one_entry(cluster_name, file_name)
    if not entry then
        entry = g_gater_ormobj:create_one_entry({cluster_name = cluster_name, file_name = file_name, cur_date = 0, offset = 0})
    end

    local time_key = cluster_name .. '-' .. file_name
    local pre_timer = g_loop_timer_map[time_key]
    if pre_timer then
        pre_timer:cancel()
    end

    local cur_time = time_util.time()
    local file_path = use_log_info.file_path
    local split_str = string_util.split(cluster_name, ':')
    local svr_name, svr_id = split_str[1], tonumber(split_str[2])
    --local maxage = use_log_info.maxage
    local one_line = 20
    local cur_date = tonumber(os.date("%Y%m%d", cur_time))

    local use_date = entry:get('cur_date')
    if use_date == 0 or use_date > cur_date then
        entry:set('cur_date', cur_date)
    end

    use_date = entry:get('cur_date')
    local fname = use_date .. '_' .. file_name

    local frpc_cli = frpc_client:instance(svr_name, '.use_log'):set_svr_id(svr_id)
    local function gather_logic()
        local offset = entry:get('offset')
        local ret, errcode, errmsg = frpc_cli:byid_call_by_name('read', file_path, fname, offset, one_line)
        if not ret then
            log.error("gather err ", errcode, errmsg)
            return
        end

        local isok, ret_str, last_offset, file_size = tunpack(ret.result)
        if use_date < cur_date and (not isok or offset == last_offset) then    --不是当天并且玩家不存在或者已读完
            --切换到下一天
            local year = math.floor(use_date / 1000)
            local month = math.floor(use_date / 10) % 100
            local day = use_date % 100
            local date_t = time_util.date(cur_date)
            date_t.year = year
            date_t.month = month
            date_t.day = day + 1
            local next_time = os.time(date_t)
            use_date = tonumber(os.date("%Y%m%d", next_time))
            entry:set('cur_date', use_date)
            fname = use_date .. '_' .. file_name

            log.info("next day: ", cluster_name, fname)
        elseif offset == last_offset then
            if offset > file_size then      --文件被修改了，重新来
                entry:set('offset', 0)
            end
        else
            local pre_index = 1
            --log.info(">>>>>>> ", cluster_name, fname, ret_str)
            local data_list_map = {}
            for i = 1, one_line do
                local s,e = string.find(ret_str, '\n', pre_index, true)
                if not s then
                    break
                end
                local json_str = ret_str:sub(pre_index, s - 1)
                --log.info(" >>>>> json_str = ", pre_index, s - 1, json_str)
                local str_len = #json_str
                if json_str:sub(str_len, str_len) ~= '}' then
                    break
                end
                local log_data, err = json.decode(json_str)
 
                if not log_data then
                    log.error("decode json err ", err, json_str)
                else
                    local tab_name = log_data._log_name
                    log_data._log_name = nil
                    if not data_list_map[tab_name] then
                        data_list_map[tab_name] = {}
                    end
                    table.insert(data_list_map[tab_name], log_data)
                end

                pre_index = e + 1
                offset = offset + str_len + 1
            end

            for tab_name, data_list in pairs(data_list_map) do
                local orm = g_orm_map[tab_name]
                if not orm then
                    log.warn("wait create orm ", cluster_name, tab_name)
                    wait:wait(tab_name)
                else
                    local res = orm:create_entry(data_list)
                    for i = 1, #res do
                        if not res[i] then
                            log.error("create_entry err ", tab_name, data_list[i])
                        end
                    end
                end
            end

            entry:set('offset', offset)
            --log.info(" >>>> offset >>> ", offset)
        end
    end

    local new_timer = timer:new(timer.second * 10, 0, gather_logic):after_next()

    g_loop_timer_map[time_key] = new_timer

    g_timer_point = timer_point:new(timer_point.EVERY_DAY):builder(function()
        local cur_Time = time_util.time()
        for tab_name, use_log_info in pairs(g_log_info_map) do
            local maxage = use_log_info.maxage
            local pre_time = time_util.day_time(-maxage, 0, 0, 0, cur_Time)
            --删除保留天数以外的数据
            local orm = g_orm_map[tab_name]
            if orm then
                if not orm:idx_delete_entry_by_range(nil, pre_time, "_time") then
                    log.error("idx_delete_entry_by_range err", tab_name, pre_time)
                end
            end
        end
    end)
end

local CMD = {}

function CMD.start(config)
    local mysqlcli = nil
    skynet.fork(function()
        mysqlcli = mysqli.new_client('orm_db')
        local adapter = ormadapter_mysql:new(nil, mysqlcli)
        g_gater_ormobj = ormtable:new('gather_info')
        :string64('cluster_name')
        :string64('file_name')
        :uint32('cur_date')     --当前采集的日期
        :uint32('offset')       --文件记录的偏移量
        :set_cache(0, 500)      --永久缓存，5秒同步一次修改
        :set_keys('cluster_name','file_name')
        :builder(adapter)

        wait:wakeup("gater")
    end)

    local node_map = config.node_map
    for svr_name in pairs(node_map) do
        watch_syn_client.pwatch(svr_name, SYN_CHANNEL_NAME.log_desc_info .. '*', "handle_name_1", function(cluster_name, use_log_info)
            if not g_gater_ormobj then
                wait:wait("gater")
            end
            queue(create_orm_obj, use_log_info, mysqlcli)
            queue(create_gather_loop, cluster_name, use_log_info)
        end)
    end

    
    return true
end

function CMD.fix_exit()
    if g_timer then
        g_timer:cancel()
    end

    for _,timer in pairs(g_loop_timer_map) do
        timer:cancel()
    end

    if g_gater_ormobj then
        g_gater_ormobj:save_change_now()
    end

    if g_timer_point then
        g_timer_point:cancel()
    end
end

function CMD.exit()
    return true
end

skynet_util.reg_shutdown_func(function()
    log.info("log_gather_m >>> save begin")
    if g_gater_ormobj then
        g_gater_ormobj:save_change_now()
    end
    log.info("log_gather_m >>> save end")
end)

return CMD