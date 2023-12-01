local CODE = require "CODE"

local function new_body(code,message,data)
    return {
        code = code,
        message = message,
        data = data,
    }
end

local M = {}

local function ok_rsp(data)
    return new_body(CODE.OK,nil,data)
end

local function error_rsp(code, message)
    return new_body(code,message,nil)
end

function M.set_rsp(context, data, code, message)
    if not data then
        context.res:set_json_rsp(error_rsp(code, message))
    else
        context.res:set_json_rsp(ok_rsp(data))
    end
end

return M