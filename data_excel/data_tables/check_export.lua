local lfs = require "lfs"
local utils = require "utils"

local tinsert = table.insert
local EMPTY = {}

INTERFACE = {}                  --检查接口

local EXPORT_DIR = "..\\..\\commonlualib\\data_tables"
lfs.mkdir(EXPORT_DIR)

local export_list = {}
local export_file_map = {}
local files_map = {}

--加载
for filename in lfs.dir("./check") do
    if filename ~= '.' and filename ~= '..' then
        local chunk,err = loadfile("check/" .. filename)
        assert(chunk, err)
        files_map[filename] = chunk()
    end
end

--检查
for _, tab in pairs(files_map) do
    local export = tab.export
    for _, fn in pairs(export) do
        tinsert(export_list, fn)
        export_file_map[fn .. '.lua'] = true
    end

    tab.check_func()
end

--导出
for i = 1,#export_list do
    local filename = export_list[i]
    local new_data = require ("lua." .. filename)

    local old_file_path = EXPORT_DIR .. '\\' .. filename .. '.lua'
    local old_data = loadfile(old_file_path)
    if old_data then
        old_data = old_data()
    else
        old_data = EMPTY
    end

    local def = utils.check_def_table(new_data, old_data)
    if next(def) then
        lfs.mkdir(EXPORT_DIR)
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

--删除冗余
for filename in lfs.dir(EXPORT_DIR) do
    if filename ~= '.' and filename ~= '..' then
        if not export_file_map[filename] then
            local cmd = string.format('del "%s"', EXPORT_DIR .. '\\' .. filename)
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