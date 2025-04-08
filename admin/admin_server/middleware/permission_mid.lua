local log = require "skynet-fly.log"
local CODE = require "common.enum.CODE"
local rsp_body = require "common.rsp_body"
local table_util = require "skynet-fly.utils.table_util"
local ENUM = require "enum.ENUM"

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
        local matched = context.matched
        local path = matched.path
        local method = context.req.method
        method = string.upper(method)
        local pathmap = g_path_map[method]
        --没有权限控制
        if not pathmap or not pathmap[path] then
            context:next()
            return
        end
        local username = token_auth.username
        --超级管理员
        if username == ENUM.ADMIN_USER then
            context:next()
            return
        end

        local client_path = pathmap[path]
        --log.info("permission_mid>>> ",method, path, client_path)
        if not routes_map[client_path] then
            --没有权限
            log.info("没有权限>>>>>>>>>>>>>>>>>>>", path)
            rsp_body.set_rsp(context, nil ,CODE.NOT_PERMISSION, "not read permission")
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