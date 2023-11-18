local log = require "log"
local CODE = require "CODE"
local rsp_body = require "rsp_body"

local string = string

local M = {}

local g_path_map = {}

function M.set(method,server_path,client_path)
    method = string.upper(method)
    if not g_path_map[method] then
        g_path_map[method] = {}
    end
    g_path_map[method][server_path] = client_path
end

function M.auth()
    return function(context)
        local token_auth = context.token_auth
        if token_auth.is_white then
            context:next()
            return
        end

        local routes_map = token_auth.routes_map
        local params = context.params
        local path = params._path
        local method = params._method
        method = string.upper(method)
        local pathmap = g_path_map[method]
        if not pathmap or not pathmap[path] then
            context:next()
            return
        end

        local client_path = pathmap[path]
        log.info("permission_mid>>> ",method, path, client_path)
        if not routes_map[client_path] then
            --没有权限
            log.info("没有权限>>>>>>>>>>>>>>>>>>>", path)
            rsp_body.set_rsp(context, nil ,CODE.NOT_PERMISSION, "not ready permission")
            context:abort()
        else
            if method ~= 'GET' and not routes_map[client_path].w then
                --没有写权限
                log.info("没有写权限>>>>>>>>>>>>>>>>>", path)
                rsp_body.set_rsp(context, nil ,CODE.NOT_PERMISSION, "not write permission")
                log.info("self.body>>> ",context.res.body)
                context:abort()
            end
        end
    end
end

return M