
local watch_syn_client = require "skynet-fly.rpc.watch_syn_client"
local permission_mid = require "middleware.permission_mid"
local global_email = require "common.rpc.centerserver.global_email"
local item_conf = require "common.conf.item_conf"
local rsp_body = require "common.rsp_body"
local CODE = require "common.enum.CODE"
local log = require "skynet-fly.log"

local tonumber = tonumber
local assert = assert
local ipairs = ipairs
local pairs = pairs
local table = table
local math = math

local g_email_list = {}--全服邮件列表
watch_syn_client.watch("centerserver", "global_email", "handle1", function(cluter_name, email_map)
    g_email_list = {}

    for _,email in pairs(email_map) do
        table.insert(g_email_list, email)
    end
    table.sort(g_email_list, function(a,b) return a.guid < b.guid end)
end)

local function check_email(email)
    local title = email.title
    local content = email.content
    local item_list = email.item_list
    local vaild_time = email.vaild_time
    if not title then
        return false, CODE.ERR_PARAM, "not title"
    end
    if title:len() > 256 then
        return false, CODE.ERR_PARAM, "title len limit 256"
    end
    if not content then
        return false, CODE.ERR_PARAM, "not content"
    end
    if content:len() > 8192 then
        return false, CODE.ERR_PARAM, "content len limit 8192"
    end
    if not item_list then
        return false, CODE.ERR_PARAM, "not item_list"
    end
    if not vaild_time then
        return false, CODE.ERR_PARAM, "not vaild_time"
    end

    for _,one_item in ipairs(item_list) do
        one_item.id = tonumber(one_item.id)
        local item_id = one_item.id
        one_item.count = tonumber(one_item.count)
        local count = one_item.count
        if not item_id then
            return false, CODE.ERR_PARAM, "not item_id"
        end
        
        if not count then
            return false, CODE.ERR_PARAM, "not count"
        end

        if not item_conf.get_item_info(item_id) then
            return false, CODE.ERR_PARAM, "item_id not exists"
        end

        if count <= 0 then
            return false, CODE.ERR_PARAM, "vaild item_count"
        end
    end

    return true
end

--全服邮件接口
return function(group)
    --获取邮件列表
    permission_mid.set('get',group:calculate_absolute_convert_path('/list'),'/global_email/index') --设置权限验证
    group:get('/list',function(c)
        rsp_body.set_rsp(c, g_email_list)
    end)

    --新增邮件
    permission_mid.set('post',group:calculate_absolute_convert_path('/add'),'/global_email/index') --设置权限验证
    group:post('/add', function(c)
        local new_email = c.req.body
        assert(new_email, "not new_email")
        local isok, code, msg = check_email(new_email)
        if not isok then
            return rsp_body.set_rsp(c, nil, code, msg)
        end
        local title = new_email.title
        local content = new_email.content
        local item_list = new_email.item_list
        local vaild_time = new_email.vaild_time
        local isok = global_email.add(title, content, item_list, vaild_time)
        if isok then
            rsp_body.set_rsp(c, "succ")
        else
            rsp_body.set_rsp(c, nil, CODE.ERR_SERVER, "server err")
        end
    end)

    --修改邮件
    permission_mid.set('put',group:calculate_absolute_convert_path('/update/:guid'),'/global_email/index') --设置权限验证
    group:put('/update/:guid', function(c)
        local params = c.params
        local guid = tonumber(params.guid)
        assert(guid, "not guid")
        local new_email = c.req.body
        assert(new_email, "not new_email")
        local isok, code, msg = check_email(new_email)
        if not isok then
            return rsp_body.set_rsp(c, nil, code, msg)
        end
        local title = new_email.title
        local content = new_email.content
        local item_list = new_email.item_list
        local vaild_time = new_email.vaild_time

        local isok = global_email.change(guid, title, content, item_list, vaild_time)
        if isok then
            rsp_body.set_rsp(c, "succ")
        else
            rsp_body.set_rsp(c, nil, CODE.ERR_SERVER, "server err")
        end
    end)

    --删除邮件
    permission_mid.set('delete',group:calculate_absolute_convert_path('/del/:guid'),'/global_email/index') --设置权限验证
    group:delete('/del/:guid', function(c)
        local params = c.params
        local guid = tonumber(params.guid)
        assert(guid, "not guid")
        local isok = global_email.del(guid)
        if isok then
            rsp_body.set_rsp(c, "succ")
        else
            rsp_body.set_rsp(c, nil, CODE.ERR_SERVER, "server err")
        end
    end)

    --查询道具列表
    permission_mid.set('get',group:calculate_absolute_convert_path('/itemList'),'/global_email/index') --设置权限验证
    group:get('/itemList', function(c)
        rsp_body.set_rsp(c, item_conf.get_item_list())
    end)
end