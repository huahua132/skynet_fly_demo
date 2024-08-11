

local assert = assert
local tonumber = tonumber
local string = string
local math = math
local tinsert = table.insert

local M = {}
--构建玩家ID
--由于js没有long类型，最大能表示 2^53-1的整数，所以调整一下ID结构,为了尽可能的兼容所有客户端
-- 9      0071      9925   4740991      (1个能注册1千万-1个账号)
-- 预留位 渠道id    服务id   自增id

local MAX_INCRID = 9999999
local INCRID_LIMIT = MAX_INCRID + 1
local MAX_CHANELLID = 9999
local CHANELLID_LIMIT = MAX_CHANELLID + 1
local MAX_SVRID = 9999
local SVRID_LIMIT = MAX_SVRID + 1
function M.builder_player_id(channel_id, svr_id, incrid)
    assert(channel_id <= MAX_CHANELLID, "channel_id overflow")
    assert(svr_id <= MAX_SVRID, "svr_id overflow")
    assert(incrid <= MAX_INCRID, "incr overflow")
    return tonumber(string.format("1%04d%04d%07d", channel_id, svr_id, incrid))
end

-- 通过玩家id得到渠道ID
function M.get_channel_id_by_player_id(player_id)
    local offset = INCRID_LIMIT * SVRID_LIMIT
    return math.floor(player_id / offset) % CHANELLID_LIMIT
end

-- 通过玩家id得到服务id
function M.get_svr_id_by_player_id(player_id)
    local offset = INCRID_LIMIT
    return math.floor(player_id / offset) % SVRID_LIMIT
end

-- 按服区分
function M.get_svr_id_by_player_list(player_list)
    local svr_map = {}
    for i = 1, #player_list do
        local player_id = player_list[i]
        local svr_id = M.get_svr_id_by_player_id(player_id)
        if not svr_map[svr_id] then
            svr_map[svr_id] = {}
        end
        tinsert(svr_map[svr_id], player_id)
    end
    return svr_map
end

assert(M.get_channel_id_by_player_id(1100120021234567) == 1001)
assert(M.get_svr_id_by_player_id(1100120021234567) == 2002)

return M