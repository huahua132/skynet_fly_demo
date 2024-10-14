local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local log = require "skynet-fly.log"

local loadfile = loadfile
local pairs = pairs
local string = string
local assert = assert
local tostring = tostring
local mfloor = math.floor

local g_instance_map = {}

local M = {}

function M.new(name, pack_obj)
    assert(name, "not name")
    assert(pack_obj, "not pack_obj")
    local m_name = name
    local pack_obj = pack_obj
    local m_PACK = {}
    local m_ID = {}

    local ret_M = {}

    function ret_M.set_pack_id_names(dirs)
        for _, dir in pairs(dirs) do
            --指定目录下 PACK.lua 编写主码
            local p = dir .. 'PACK.lua'
            local packs = loadfile(p)
            if not packs then
                log.error(m_name .. " set_pack_id_names not exists " .. p)
                return
            end
            packs = packs()
    
            --对应packid 目录下编写子码
            for packname, id in pairs(packs) do
                assert(id >= 1 and id <= 654)                           --因为packid是uint16 最大值为65535，所以主码最大值为654
                local p = dir .. '/packid/' .. packname .. '.lua'
                local sub_packs = loadfile(p)
                if not sub_packs then
                    log.error(m_name .. "set_pack_id_names subpack not exists " .. p)
                    return
                end
                sub_packs = sub_packs()

                m_ID[packname] = id
    
                if not m_PACK[packname] then
                    m_PACK[packname] = {}
                end
                local name_pack_id = m_PACK[packname]
    
                for name, sub_id in pairs(sub_packs) do
                    assert(sub_id >= 1 and sub_id <= 100)
                    local pack_id = id * 100 + sub_id
                    local packname = string.format('.%s.%s', packname, name)
                    pack_obj.set_packname_id(pack_id, packname)
    
                    name_pack_id[name] = pack_id
                end
            end
        end
    end

    ret_M.PACK = m_PACK
    ret_M.ID = m_ID

    return ret_M
end

--常驻实例
function M.instance(name, pack_obj)
    if not g_instance_map[name] then
        g_instance_map[name] = M.new(name, pack_obj)
    end
    return g_instance_map[name]
end

--拆分出主码，子码
function M.get_id_subid(pack_id)
    local id = mfloor(pack_id / 100)
    local subid = pack_id % 100
    return id, subid
end

local g_default = M.new('default', pb_netpack)
setmetatable(M, {__index = g_default})

return M