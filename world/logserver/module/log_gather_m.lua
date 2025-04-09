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
local setmetatable = setmetatable
local pcall = pcall
local next = next
local coroutine = coroutine
local x_pcall = x_pcall

local g_IGNORE_MAP = {
    ['_log_name'] = true
}
local g_gater_ormobj = nil
local g_orm_map = {}
local g_log_info_map = {}
local g_timer_point = nil
local g_loop_timer_map = {}
local g_try_data_map = {}
local g_logicing_map = {}
local g_MAX_TRY_JOIN_DATE_LIST = 10000                 --最多缓存一万条重试待插入日志，如果超过，将暂定日志采集
local g_try_cur_num = 0
local g_is_over_map = setmetatable({}, {__mode = 'kv'})
local g_config = nil

local g_orm_type_strs = {}
do
    for str, type in pairs(ormtable.FIELD_TYPE) do
        g_orm_type_strs[type] = str
    end
end

local function is_need_wait()
    if g_try_cur_num >= g_MAX_TRY_JOIN_DATE_LIST then
        wait:wait("waiting_try")
        skynet.sleep(math.random(1, 100))
    end
end

local function add_try_data(tab_name, data)
    g_try_cur_num = g_try_cur_num + 1
    g_try_data_map[data] = {
        try_cnt = 0,                    --重试次数
        tab_name = tab_name,
    }
end

local function try_insert(try_num)
    local list = {}
    for data, info in pairs(g_try_data_map) do
        table.insert(list, {data = data, info = info})
    end

    table.sort(list, function(a, b) return a.info.try_cnt < b.info.try_cnt end)

    for i = 1, try_num do
        local one = list[i]
        if one then
            local data = one.data
            local info = one.info
            local orm = g_orm_map[info.tab_name]
            local isok, ret = pcall(orm.create_one_entry, orm, data)
            if isok and ret then
                g_try_data_map[data] = nil
                g_try_cur_num = g_try_cur_num - 1
            else
                info.try_cnt = info.try_cnt + 1
            end
        end
    end

    if g_try_cur_num < g_MAX_TRY_JOIN_DATE_LIST then
        wait:wakeup("waiting_try")
    end
end

local function try_insert_data(try_num)
    queue(try_insert, try_num)
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
    local time_key = cluster_name .. '-' .. file_name
    local pre_timer = g_loop_timer_map[time_key]
    if pre_timer then
        pre_timer:cancel()
    end

    local file_path = use_log_info.file_path
    local split_str = string_util.split(cluster_name, ':')
    local svr_name, svr_id = split_str[1], tonumber(split_str[2])
    local one_line = 100
    local frpc_cli = frpc_client:instance(svr_name, '.use_log'):set_svr_id(svr_id)

    local function gather_logic()
        is_need_wait()

        local cur_time = time_util.time()
        local cur_date = tonumber(os.date("%Y%m%d", cur_time))
        local entry = g_gater_ormobj:get_one_entry(cluster_name, file_name, cur_date)
        if not entry then
            entry = g_gater_ormobj:create_one_entry({cluster_name = cluster_name, file_name = file_name, cur_date = cur_date})
        end

        local entry_list = g_gater_ormobj:get_entry(cluster_name, file_name)
        for i = 1, #entry_list do
            local entry = entry_list[i]
            local date = entry:get('cur_date')
            local year = math.floor(date / 1000)
            local month = math.floor(date / 10) % 100
            local day = date % 100
            local date_t = time_util.date(cur_date)
            date_t.year = year
            date_t.month = month
            date_t.day = day + 1
            local next_time = os.time(date_t)
            local next_date = tonumber(os.date("%Y%m%d", next_time))
            local fname = date .. '_' .. file_name
            local offset = entry:get('offset')
            if not g_is_over_map[entry] then
                local ret, errcode, errmsg = frpc_cli:byid_call_by_name('read', file_path, fname, offset, one_line)
                if not ret then
                    log.error("gather err ", file_path, fname, errcode, errmsg)
                else
                    local isok, ret_str, last_offset, file_size = tunpack(ret.result)
                    if not isok then                --文件不存在
                        if date ~= cur_date then
                            log.info_fmt("file open faild cluster_name[%s] file_path[%s] fname[%s] date[%s] ret_str[%s]", cluster_name, file_path, fname, date, ret_str)
                            g_is_over_map[entry] = true
                        end
                    elseif offset == last_offset then   --已读完
                        if date == cur_date then      --当天不管
                        elseif next_date == cur_date then --昨天        --继续读1个小时(读到凌晨1点)，避免卡到文件关闭的间隙导致尾部部分没有读取
                            local over_time = time_util.day_time(0, 1, 0, 0, cur_time)
                            if cur_time > over_time then
                                g_is_over_map[entry] = true --标记已读完
                                log.info_fmt("file read over yesterday cluster_name[%s] file_path[%s] fname[%s] date[%s] ret_str[%s]", cluster_name, file_path, fname, date, ret_str)
                            end
                        else                              --其他时间标记已读完
                            g_is_over_map[entry] = true
                            log.info_fmt("file read over preday cluster_name[%s] file_path[%s] fname[%s] date[%s] ret_str[%s]", cluster_name, file_path, fname, date, ret_str)
                        end
                    else
                        entry:set('file_size', file_size)
                        local pre_index = 1
                        local add_line = 0
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
                            add_line = add_line + 1
                        end

                        for tab_name, data_list in pairs(data_list_map) do
                            local orm = g_orm_map[tab_name]
                            if not orm then
                                log.warn("wait create orm ", cluster_name, tab_name)
                                wait:wait(tab_name)
                            else
                                local res = orm:create_entry(data_list)                         --失败一般就是网络问题或者数据库出问题了
                                for i = 1, #res do
                                    if not res[i] then
                                        log.error("create_entry err ", tab_name, data_list[i])
                                        add_try_data(tab_name, data_list[i])                    --记录一下，间隔时间重试
                                    end
                                end
                            end
                        end

                        entry:set('offset', offset)
                        local pre_line_num = entry:get('linenum')
                        entry:set('linenum', pre_line_num + add_line)
                    end
                end
            end
        end
    end

    local function xp_gather_logic()
        local co = coroutine.running()
        g_logicing_map[co] = true
        local isok, err = x_pcall(gather_logic)
        if not isok then
            log.error("xp_gather_logic err ", err)
        end
        g_logicing_map[co] = nil
        if not next(g_logicing_map) then
            wait:wakeup("logic_over")
        end
    end

    local new_timer = timer:new(timer.second * (10 + math.random(1, 5)), 0, xp_gather_logic):after_next()

    g_loop_timer_map[time_key] = new_timer

    g_timer_point = timer_point:new(timer_point.EVERY_DAY):builder(function()
        local cur_Time = time_util.time()
        for tab_name, use_log_info in pairs(g_log_info_map) do
            local maxage = use_log_info.maxage
            local pre_time = time_util.day_time(-maxage, 0, 0, 0, cur_Time)
            --删除保留天数以外的数据
            local orm = g_orm_map[tab_name]
            if orm then
                orm:idx_delete_entry({_time = {['$lte'] = pre_time}})
            end

            local pre_time = time_util.day_time(-7, 0, 0, 0, cur_Time)
            local pre_date = tonumber(os.date("%Y%m%d", pre_time))
            --只保留7天的采集数据
            g_gater_ormobj:idx_delete_entry({cur_date = {['$lte'] = pre_date}})
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
        :uint32('cur_date')     --采集的日期
        :uint32('offset')       --文件采集的偏移量
        :uint32('file_size')    --文件大小
        :uint32('linenum')      --采集总行数
        :set_cache(0, 500)      --永久缓存，5秒同步一次修改
        :set_index('date_index', 'cur_date')
        :set_keys('cluster_name','file_name', 'cur_date')
        :builder(adapter)

        wait:wakeup("gater")
    end)
    g_config = config
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

    timer:new(timer.minute, 0, try_insert_data, 20)   --重试插入数据
    
    return true
end

function CMD.fix_exit()
    local node_map = g_config.node_map
    for svr_name in pairs(node_map) do
        watch_syn_client.unpwatch(svr_name, SYN_CHANNEL_NAME.log_desc_info .. '*', "handle_name_1")
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

function CMD.check_exit()
    log.warn("check_exit g_try_cur_num = ", g_try_cur_num)
    return g_try_cur_num == 0
end

function CMD.exit()
    return true
end

skynet_util.reg_shutdown_func(function()
    local node_map = g_config.node_map
    for svr_name in pairs(node_map) do
        watch_syn_client.unpwatch(svr_name, SYN_CHANNEL_NAME.log_desc_info .. '*', "handle_name_1")
    end

    for _,timer in pairs(g_loop_timer_map) do
        timer:cancel()
    end

    log.info("log_gather_m >>> try_insert_data begin")
    try_insert_data(g_try_cur_num)
    log.info("log_gather_m >>> try_insert_data end")

    if next(g_logicing_map) then
        log.info("log_gather_m >>> wait logic_over begin")
        wait:wait("logic_over")
        log.info("log_gather_m >>> wait logic_over end")
    end

    log.info("log_gather_m >>> save begin")
    if g_gater_ormobj then
        g_gater_ormobj:save_change_now()
    end
    log.info("log_gather_m >>> save end")

    if next(g_try_data_map) then
        log.error("remain try_insert_data ", g_try_data_map)
    end
end)

return CMD