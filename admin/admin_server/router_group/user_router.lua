local model_user = require "model.model_user"
local rsp_body = require "common.rsp_body"
local log = require "skynet-fly.log"
local CODE = require "common.enum.CODE"
local crypt = require "skynet.crypt"
local crypt_util = require "skynet-fly.utils.crypt_util"
local permission_mid = require "middleware.permission_mid"
local ENUM = require "enum.ENUM"
local openssl = require "openssl"
local pkey = openssl.pkey
local bio = openssl.bio
local ec = openssl.ec

local assert = assert
local error = error
local client_path = ENUM.client_path

--检查是否握手了
local function check_handshake(c)
    local req = c.req
    local session = req.session
    if not session.handshake then
        log.warn("not handshake login", req.ip)
        rsp_body.set_rsp(c, nil, CODE.NOT_HANDSHAKE)
        c:abort()
    end
end

--握手过程，参考skynet login_server模块
local function handshake(c)
    local req = c.req
    local session = req.session
    --stop 1 S2C : base64(8bytes random challenge)
    if not session.challenge then
        local challenge = crypt.randomkey()
        session.challenge = challenge
        rsp_body.set_rsp(c, crypt.base64encode(challenge))
        log.info("handshake 1:", challenge)
    elseif not session.client_key then
        -- stop 2 C2S : base64(8bytes handshake client key) 
        local client_key = assert(req.body.key, "not key")
        log.info("client_key:", client_key:len())
        if #client_key ~= 178 then
			error("Invalid client key " .. req.fd)
		end
        log.info("client_key:",client_key)
        session.client_key = client_key
        -- stop 3 Server: Gen a 8bytes handshake server key 生成一个用户交换 secret 的 key
        local nodePublicKey,err = pkey.read(client_key, false, 'pem', 'ec')
        local clientec = nodePublicKey:parse().ec

        local serverec = pkey.new('ec', "prime256v1")
        local server_key = serverec:get_public():export('pem')
        serverec = serverec:parse().ec

        rsp_body.set_rsp(c, server_key)

        session.secret = serverec:compute_key(clientec)

        log.info("secret:", crypt.base64encode(session.secret), server_key)
    else
        
        -- stop 6 C2S : base64(HMAC(challenge, secret)) 回应服务器第一步握手的挑战码，确认握手正常。
        local challenge = assert(req.body.challenge, "not challenge")
        local hmac = crypt_util.HMAC.SHA256(req.session.challenge, session.secret)
		if hmac ~= challenge then
			error("challenge failed" .. req.fd)
		end
        session.handshake = true                       --握手成功

        rsp_body.set_rsp(c, "OK")
    end
end

local function login(c)
    local req = c.req
    local session = req.session
    local token_str = assert(req.body.token,"not token")
    local iv = assert(req.body.iv, "not iv")
    local tag = assert(req.body.tag, "not tag")

    --log.info("login1 >>>", token_str, iv, tag)
    iv = crypt.base64decode(iv)
    token_str = crypt.base64decode(token_str)
    tag = crypt.base64decode(tag)
    local evp = openssl.cipher.get('aes-256-gcm')
    --log.info("login2 >>>> ",evp)
    local e = evp:decrypt_new()
    assert(e:ctrl(openssl.cipher.EVP_CTRL_GCM_SET_IVLEN, #iv))
    assert(e:init(session.secret, iv))
    e:padding(false)

    local token = assert(e:update(token_str))
    assert(e:ctrl(openssl.cipher.EVP_CTRL_GCM_SET_TAG, tag))
    token = token .. assert(e:final())
    assert(#token == #token_str)
    --log.info("login3 >>>> ",evp, token)
    -- local token = crypt.desdecode(session.secret, crypt.base64decode(token_str))
    local username, password = token:match("(.+)@(.+)")
    username = crypt.base64decode(username)
    password = crypt.base64decode(password)
    --log.info("login4 >>>> ", username, password)

    local data, code, msg = model_user.login(username, password)
    rsp_body.set_rsp(c,data,code,msg)
end

local function info(c)
    local username = c.token_auth.username
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
    group:post('/handshake', handshake)
    group:post('/login',check_handshake, login)
    group:get('/info', info)
    group:post('/logout', logout)
    permission_mid.set('get',group:calculate_absolute_convert_path('/list'),client_path .. '/user')
    group:get('/list', list)
    permission_mid.set('post',group:calculate_absolute_convert_path('/add'),client_path .. '/user')
    group:post('/add', add)
    permission_mid.set('put',group:calculate_absolute_convert_path('/up/:username'),client_path .. '/user')
    group:put('/up/:username', update)
    permission_mid.set('delete',group:calculate_absolute_convert_path('/del/:username'),client_path .. '/user')
    group:delete('/del/:username', delete)
end