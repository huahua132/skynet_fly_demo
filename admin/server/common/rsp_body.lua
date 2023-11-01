local CODE = require "CODE"

local function new_body(code,message,data)
    return {
        code = code,
        message = message,
        data = data,
    }
end

local M = {}

function M.ok_rsp(data)
    return new_body(CODE.OK,nil,data)
end

function M.error_rsp(code,message)
    return new_body(code,message,nil)
end

return M