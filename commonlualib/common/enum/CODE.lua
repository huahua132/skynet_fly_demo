local code = {
    OK = 20000,
    ILLEGAL_TOKEN = 50008,        --无效token
    OTHER_LOGINED = 50012,        --重复登录
    TOKEN_EXPIRED = 50014,        --token过期
    NOT_USER = 50016,             --用户不存在
    ERR_PASSWORD = 50018,         --密码错误
    ERR_SERVER = 50020,           --服务器出错
    NOT_PERMISSION = 50022,       --没有权限
    NOT_HANDSHAKE = 50023,        --还没有握手
    ERR_PARAM = 50033,            --参数错误
    EXISTS_USER = 50034,          --用户已存在
    SERVER_BUZY = 50035,          --服务器繁忙
    ACCOUNT_LEN = 50036,          --账号长度不符合要求
    SERVER_CLOSE = 50037,         --已关服
}

return code