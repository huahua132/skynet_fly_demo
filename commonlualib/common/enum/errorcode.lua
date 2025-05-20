return {
	UNKOWN_ERR = -1,         --未知错误
	OK = 0,					 --正常
	LOGIN_PASS_ERR = 1,      --登录密码错误
	NOT_LOGIN = 2,           --没有登录
	REQ_PARAM_ERR = 3,       --请求参数错误
	REPAET_LOGIN = 4,        --重复请求登录
	TABLE_FULL = 5,          --房间爆满
	TABLE_ENTER_ERR = 6,     --坐下失败
	LOGINING = 7,            --登录中
	PLAYING = 8,             --游戏进行中
	PROTOCOL_ERR = 9,        --协议出错
	ACCOUNT_NOT_EXISTS = 10, --账号不存在
	TOKEN_ERR = 11,          --token失效
	ACCOUNT_EXISTS = 12,     --账号已存在
	GAME_NOT_EXISTS = 13,    --游戏不存在
	GAME_ROOM_EXISTS = 14,   --已存在游戏房间
	MATCHING = 15,		     --匹配中
	NOT_MATCHING = 16,       --没在匹配中
	SERVER_CLOSE = 17,		 --已关服
	CANT_ENTER = 18,		 --不允许进入
}