local lfs = require "lfs"
local utils = require "utils"

local tinsert = table.insert
local EMPTY = {}

EXPORT_TARGET = {
    common = 1,
    game_common = 2,
    hall_server = 3,
}

local EXPORT_TARGET_DIR = {
    common = "..\\..\\commonlualib\\common\\data_tables",             --公共
    game_common = "..\\..\\commonlualib\\gamecommon\\data_tables",    --游戏服公共
    hall_server = "..\\..\\world\\hallserver\\data_tables",           --大厅服
}

local export_list = {}
local export_file_map = {}
for name, target in pairs(EXPORT_TARGET) do
    export_list[target] = {}
    export_file_map[target] = {}
end

--检查
for filename in lfs.dir("./check") do
    if filename ~= '.' and filename ~= '..' then
        local export_map = loadfile("check/" .. filename)()
        for filename, target in pairs(export_map) do
            assert(export_list[target], "target not exists :" .. target)
            tinsert(export_list[target], filename)
            export_file_map[target][filename .. '.lua'] = true
        end
    end
end

--导出
for name, target in pairs(EXPORT_TARGET) do
    local exports = export_list[target]
    for i = 1,#exports do
        local filename = exports[i]
        local new_data = require ("lua." .. filename)

        local target_dir = EXPORT_TARGET_DIR[name]
        local old_file_path = target_dir .. '\\' .. filename .. '.lua'
        local old_data = loadfile(old_file_path)
        if old_data then
            old_data = old_data()
        else
            old_data = EMPTY
        end

        local def = utils.check_def_table(new_data, old_data)
        if next(def) then
            lfs.mkdir(target_dir)
            local new_file_path = 'lua\\' .. filename .. '.lua'
            local cmd = string.format('copy "%s" "%s"', new_file_path, old_file_path)
            local isok,status,signal = os.execute(cmd)
            if not isok then
                print("Error: Failed to copy file ", cmd, isok, status, signal)
                os.exit(1)
            else
                print(cmd)
            end
        end
    end
end

--删除冗余
for name, target in pairs(EXPORT_TARGET) do
    local target_dir = EXPORT_TARGET_DIR[name]
    local file_map = export_file_map[target]
    for filename in lfs.dir(target_dir) do
        if filename ~= '.' and filename ~= '..' then
            if not file_map[filename] then
                local cmd = string.format('del "%s"', target_dir .. '\\' .. filename)
                local isok,status,signal = os.execute(cmd)
                if not isok then
                    print("Error: Failed to rm ", cmd, isok, status, signal)
                    os.exit(1)
                else
                    print(cmd)
                end
            end
        end
    end
end

--检查替换schema.lua
local new_file_path = 'gen\\schema.lua'
local old_file_path = '..\\..\\commonlualib\\common\\enum\\schema.lua'

local new_data = loadfile(new_file_path)()
local old_data = loadfile(old_file_path)
if old_data then
    old_data = old_data()
else
    old_data = EMPTY
end

local def = utils.check_def_table(new_data, old_data)
if next(def) then
    local cmd = string.format('copy "%s" "%s"', new_file_path, old_file_path)
    local isok,status,signal = os.execute(cmd)
    if not isok then
        print("Error: Failed to copy file ", cmd, isok, status, signal)
        os.exit(1)
    else
        print(cmd)
    end
end