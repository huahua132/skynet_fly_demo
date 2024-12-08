local log = require "skynet-fly.log"
local permission_mid = require "middleware.permission_mid"
local rsp_body = require "common.rsp_body"
local ENUM = require "enum.ENUM"
local CODE = require "common.enum.CODE"
local player_util = require "common.utils.player"
local frpc_client = require "skynet-fly.client.frpc_client"

local assert = assert
local tonumber = tonumber
local table = table

--gm 接口
return function(group)
    --获取gm 帮助信息
    permission_mid.set('get',group:calculate_absolute_convert_path('/help/:find_name'),'/gm/index') --设置权限验证
    group:get('/help/:find_name',function(c)
        local params = c.params
        local find_name = params.find_name
        local cli = frpc_client:instance("hallserver", "room_game_hall_m")
        if find_name == "all" then
            find_name = nil
        end
        local ret = cli:one_balance_call("gm_cmd", "help", find_name)
        if not ret then
            rsp_body.set_rsp(c, nil, CODE.ERR_SERVER, "server err")
            return
        end
        local res_list, err = table.unpack(ret.result)
        if not res_list then
            rsp_body.set_rsp(c, nil, CODE.ERR_SERVER, err)
        else
            rsp_body.set_rsp(c, res_list)
        end
    end)

    --debug 命令
    permission_mid.set('post',group:calculate_absolute_convert_path('/debug'),'/gm/index') --设置权限验证
    group:post('/debug', function(c)
        local args = c.req.body
        local player_id = tonumber(args.player_id)
        local cmd_name = args.cmd_name
        assert(player_id, "not player_id")
        assert(cmd_name, "not cmd_name")
        local params = args.params or {}
        local svr_id = player_util.get_svr_id_by_player_id(player_id)
        local cli = frpc_client:instance("hallserver", "room_game_hall_m")
        cli:set_svr_id(svr_id)
        cli:set_mod_num(player_id)
        local ret = cli:byid_mod_call("gm_cmd", cmd_name, player_id, table.unpack(params))
        if not ret then
            rsp_body.set_rsp(c, nil, CODE.ERR_SERVER, "server err")
            return
        end
        local ret, err = table.unpack(ret.result)
        
        if not ret then
            rsp_body.set_rsp(c, nil, CODE.ERR_SERVER, err)
        else
            rsp_body.set_rsp(c, ret)
        end
    end)
end