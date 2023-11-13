local log = require "log"

local M = {}

local g_path_map = {}

function M.set(method,server_path,client_path)
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
        log.info("permission_mid>>> ",routes_map,context.req.path,g_path_map)
        local params = context.req.params
        local path = params._path
        local method = params._method

        local pathmap = g_path_map[method]
        if not pathmap then
            context:next()
            return
        end

        local client_path = pathmap[path]
        if not routes_map[client_path] then
            --没有权限
        else
            if method ~= 'GET' and not routes_map[client_path].w then
                --没有写权限
            end
        end
    end
end

return M