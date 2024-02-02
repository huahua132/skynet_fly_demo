local model_user = require "model_user"
local rsp_body = require "rsp_body"
local log = require "log"
local CODE = require "CODE"
local crypt = require "skynet.crypt"
local crypt_util = require "crypt_util"
local openssl = require('openssl')
local pkey = openssl.pkey
local bio = openssl.bio
local ec = openssl.ec

local assert = assert
local error = error

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

        log.info("secret:", crypt.base64encode(session.secret))
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

    log.info("login1 >>>", token_str, iv, tag)
    iv = crypt.base64decode(iv)
    token_str = crypt.base64decode(token_str)
    tag = crypt.base64decode(tag)
    local evp = openssl.cipher.get('aes-256-gcm')
    log.info("login2 >>>> ",evp)
    local e = evp:decrypt_new()
    assert(e:ctrl(openssl.cipher.EVP_CTRL_GCM_SET_IVLEN, #iv))
    assert(e:init(session.secret, iv))
    e:padding(false)

    local token = assert(e:update(token_str))
    assert(e:ctrl(openssl.cipher.EVP_CTRL_GCM_SET_TAG, tag))
    token = token .. assert(e:final())
    assert(#token == #token_str)
    log.info("login3 >>>> ",evp, token)
    -- local token = crypt.desdecode(session.secret, crypt.base64decode(token_str))
    local username, password = token:match("(.+)@(.+)")
    username = crypt.base64decode(username)
    password = crypt.base64decode(password)
    log.info("login4 >>>> ", username, password)

    local data, code, msg = model_user.login(username, password)
    rsp_body.set_rsp(c,data,code,msg)
end

local function info(c)
    local username = c.token_auth.username
    local data,code,msg = model_user.get_info(username)
    rsp_body.set_rsp(c,data,code,msg)
end

local function logout(c)
    rsp_body.set_rsp(c,'success')
end

return function(group)
    group:post('/handshake', handshake)
    group:post('/login',check_handshake, login)
    group:get('/info',check_handshake, info)
    group:post('/logout',check_handshake, logout)
end