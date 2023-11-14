local code = {
    OK = 20000,
    ILLEGAL_TOKEN = 50008,        --无效token
    OTHER_LOGINED = 50012,        --重复登录
    TOKEN_EXPIRED = 50014,        --token过期
    NOT_USER = 50016,             --用户不存在
    ERR_PASSWORD = 50018,         --密码错误
    ERR_SERVER = 50020,           --服务器出错
    NOT_PERMISSION = 50022,       --没有权限
}

return code