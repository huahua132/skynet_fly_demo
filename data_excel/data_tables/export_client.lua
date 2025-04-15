local lfs = require "lfs"
local json = require "json"
local utils = require "utils"

local source_dir = ".\\json"   --配置来源
local target_dir = "..\\..\\client\\chinesechess_oops\\assets\\bundle\\data_tables"

local new_file_map = {}       --新文件map

--导出
for filename in lfs.dir(source_dir) do
    if filename ~= '.' and filename ~= '..' then
        new_file_map[filename] = true
        local new_file_path = source_dir .. '\\' .. filename
        local old_file_path = target_dir .. '\\' .. filename
        local new_file = io.open(new_file_path, 'r')
        local new_data = json.decode(new_file:read("*a"))
        new_file:close()
        local old_data = {}
        local old_file = io.open(old_file_path, 'r')
        if old_file then
            old_data = json.decode(old_file:read("*a"))
            old_file:close()
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
    end
end

--删除冗余
for filename in lfs.dir(target_dir) do
    if filename ~= '.' and filename ~= '..' then
        if not new_file_map[filename] then
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

--更新schema
--检查替换schema.lua
local new_file_path = 'jsongen\\schema.ts'
local old_file_path = '..\\..\\client\\chinesechess_oops\\assets\\libs\\schema.ts'
local cmd = string.format('copy "%s" "%s"', new_file_path, old_file_path)
local isok,status,signal = os.execute(cmd)
if not isok then
    print("Error: Failed to copy file ", cmd, isok, status, signal)
    os.exit(1)
else
    print(cmd)
end