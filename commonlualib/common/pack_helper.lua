local pb_netpack = require "skynet-fly.netpack.pb_netpack"
local log = require "skynet-fly.log"

local loadfile = loadfile
local pairs = pairs
local string = string
local assert = assert

local M = {}

--设置pack_id 关联pb packname映射
function M.set_pack_id_names(dirs)
    for _, dir in pairs(dirs) do
        --指定目录下 PACK.lua 编写主码
        local p = dir .. 'PACK.lua'
        local packs = loadfile(p)
        if not packs then
            log.error("set_pack_id_names not exists " .. p)
            return
        end
        packs = packs()

        --对应packid 目录下编写子码
        for packname, id in pairs(packs) do
            assert(id >= 1 and id <= 654)                           --因为packid是uint16 最大值为65535，所以主码最大值为654
            local p = dir .. '/packid/' .. packname .. '.lua'
            local sub_packs = loadfile(p)
            if not sub_packs then
                log.error("set_pack_id_names subpack not exists " .. p)
                return
            end

            for name, sub_id in pairs(sub_packs) do
                assert(sub_id >= 1 and sub_id <= 100)
                local pack_id = id * 100 + sub_id
                local packname = string.format('.%s.%s', packname, name)
                pb_netpack.set_packname_id(pack_id, packname)
            end
        end
    end
end

--获取拼接好的pack_id
function M.get_pack_id(id)
    return function(sub_id)
        return id * 100 + sub_id
    end
end

return M