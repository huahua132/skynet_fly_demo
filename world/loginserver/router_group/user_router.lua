local cluster_client = require "cluster_client"
local rsp_body = require "rsp_body"

local assert = assert

local function login(c)
    local req = c.req
    local body = req.body
    local account = body.account
    local password = body.password
    assert(account, "not account")
    assert(password, "not passwword")

    local cli = cluster_client:instance("centerserver", "account_m")
    local ret = cli:one_balance_call("auth", account, password)
    if not ret then return end
    local result = ret.result
    local isok, errcode, errmsg = result[1], result[2], result[3]
    if not isok then
        rsp_body.set_rsp(c, nil, errcode, errmsg)
    else
        local player_id, hall_server_id = errcode, errmsg
        --生成登录token
        
    end
end

return function(group)
    group:post('/login', login)
end