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
    local m_check_id = {}

    local ret_M = {}

    function ret_M.set_pack_id_names()
        for file_path, info in pairs(pack_obj.get_loaded()) do
            local packname = info.package
            m_PACK[packname] = {}
            local main_id = nil
            local name_pack_id = m_PACK[packname]
            if info.enum_type then
                for i = 1, #info.enum_type do
                    local one_enum = info.enum_type[i]
                    local value = one_enum.value
                    if one_enum.name == "main" then
                        assert(#value == 1, string.format("main enum err It must be one m_name[%s] package[%s] file_path[%s]", m_name, packname, file_path))
                        local name = value[1].name
                        local number = value[1].number
                        assert(name == packname, string.format("main enum name must package m_name[%s] name[%s] package[%s] file_path[%s]", m_name, name,  packname, file_path))
                        main_id = number
                        assert(main_id >= 1 and main_id <= 654)         --uint16 最大能表示65535
                        m_ID[packname] = main_id
                        assert(not m_check_id[main_id], string.format("repeat use main_id m_name[%s] main_id[%s] packname[%s] curpackname[%s]", m_name, main_id, m_check_id[main_id], packname))
                        m_check_id[main_id] = packname                
                    elseif one_enum.name == "sub" then
                        assert(main_id, string.format("sub enum err not main_id m_name[%s] package[%s] file_path[%s]", m_name, packname, file_path))
                        for j = 1, #value do
                            local one_v = value[j]
                            local sub_id = one_v.number
                            assert(sub_id >= 1 and sub_id <= 100)
                            local pack_id = main_id * 100 + sub_id
                            local msgname = string.format('.%s.%s', packname, one_v.name)
                            pack_obj.set_packname_id(pack_id, msgname)
            
                            name_pack_id[one_v.name] = pack_id
                        end
                    end
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