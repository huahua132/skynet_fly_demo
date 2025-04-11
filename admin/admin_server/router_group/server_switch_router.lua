local rsp_body = require "common.rsp_body"
local permission_mid = require "middleware.permission_mid"
local contriner_client = require "skynet-fly.client.contriner_client"
local skynet = require "skynet"
local log = require "skynet-fly.log"
local SERVER_SWITCH_STATUS = require "common.enum.SERVER_SWITCH_STATUS"
local CODE = require "common.enum.CODE"

contriner_client:register("server_info_m")

return function(group)
    --获取所有服务信息
    permission_mid.set('get',group:calculate_absolute_convert_path('/infos'),'/server_switch/index') --设置权限验证
    group:get('/infos',function(c)
        local infos = contriner_client:instance('server_info_m'):mod_call('get_all_server_info')
        rsp_body.set_rsp(c, infos)
    end)

    --改变开关状态
    permission_mid.set('post', group:calculate_absolute_convert_path('/change_switch'), '/server_switch/index')
    group:post('/change_switch', function(c)
        local body = c.req.body
        local cluster_name = body.cluster_name
        local switch = body.switch
        if not SERVER_SWITCH_STATUS[switch] then
            rsp_body.set_rsp(c, nil, CODE.ERR_PARAM, "not switch status")
            return
        end

        local ret, errno, errmsg = contriner_client:instance('server_info_m'):mod_call('change_switch', cluster_name, switch)
        if not ret then
            log.error("change_switch err ", errno, errmsg)
            rsp_body.set_rsp(c, nil, CODE.ERR_SERVER, "err server")
            return
        end
        rsp_body.set_rsp(c, {
            result = ret.result[1],
        })
    end)

    --白名单
    permission_mid.set('get', group:calculate_absolute_convert_path('/white_info'), '/server_switch/index')
    group:get('/white_info', function(c)
        local map = contriner_client:instance('server_info_m'):mod_call('get_white_map')
        rsp_body.set_rsp(c, map)
    end)

    --添加白名单
    permission_mid.set('post', group:calculate_absolute_convert_path('/add_white'), '/server_switch/index')
    group:post('/add_white', function(c)
        local body = c.req.body
        local player_id = body.player_id or 0
        local ret, errno, errmsg = contriner_client:instance('server_info_m'):mod_call('add_white', player_id)
        if not ret then
            log.error("add_white err ", errno, errmsg)
            rsp_body.set_rsp(c, nil, CODE.ERR_SERVER, "err server")
            return
        end
        rsp_body.set_rsp(c, {
            result = ret.result[1],
        })
    end)

    --移除白名单
    permission_mid.set('post', group:calculate_absolute_convert_path('/del_white'), '/server_switch/index')
    group:post('/del_white', function(c)
        local body = c.req.body
        local player_id = body.player_id or 0
        local ret, errno, errmsg = contriner_client:instance('server_info_m'):mod_call('del_white', player_id)
        if not ret then
            log.error("del_white err ", errno, errmsg)
            rsp_body.set_rsp(c, nil, CODE.ERR_SERVER, "err server")
            return
        end
        rsp_body.set_rsp(c, {
            result = ret.result[1],
        })
    end)
end