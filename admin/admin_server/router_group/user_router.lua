local model_user = require "model.model_user"
local rsp_body = require "common.rsp_body"
local log = require "skynet-fly.log"
local CODE = require "common.enum.CODE"
local permission_mid = require "middleware.permission_mid"
local ENUM = require "enum.ENUM"
local assert = assert
local error = error

local function login(c)
    local req = c.req
    local token = assert(req.body.token,"not token")
    local username, password = token:match("(.+)@(.+)")
    log.info("login >>>> ",username, password)
    local data, code, msg = model_user.login(username, password)
    rsp_body.set_rsp(c,data,code,msg)
end

local function info(c)
    local username = c.token_auth.username
    assert(username, "not username")
    local data,code,msg = model_user.get_info(username)
    rsp_body.set_rsp(c,data,code,msg)
end

local function logout(c)
    local req = c.req
    req.session = {}
    rsp_body.set_rsp(c,'success')
end

--用户列表
local function list(c)
    local data = model_user.list()
    rsp_body.set_rsp(c, data)
end

--新增用户
local function add(c)
    local new_user = c.req.body
    assert(new_user, "not user")
    local data,code,msg = model_user.add(new_user)
    rsp_body.set_rsp(c,data,code,msg)
end

--修改
local function update(c)
    local user = c.req.body
    local params = c.params
    local username = params.username
    assert(username, "not username")
    assert(user, "not user")
    log.info("update:", user)
    local data,code,msg = model_user.update(username, user)
    rsp_body.set_rsp(c,data,code,msg)
end

--删除
local function delete(c)
    local params = c.params
    local username = params.username
    assert(username, "not username")
    local data,code,msg = model_user.delete(username)
    rsp_body.set_rsp(c,data,code,msg)
end

return function(group)
    group:post('/login', login)
    group:get('/info', info)
    group:post('/logout', logout)
    permission_mid.set('get',group:calculate_absolute_convert_path('/list'),'/user/index')
    group:get('/list', list)
    permission_mid.set('post',group:calculate_absolute_convert_path('/add'),'/user/index')
    group:post('/add', add)
    permission_mid.set('put',group:calculate_absolute_convert_path('/up/:username'),'/user/index')
    group:put('/up/:username', update)
    permission_mid.set('delete',group:calculate_absolute_convert_path('/del/:username'),'/user/index')
    group:delete('/del/:username', delete)
end