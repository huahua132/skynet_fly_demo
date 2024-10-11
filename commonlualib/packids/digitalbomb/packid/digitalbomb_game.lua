--这里是主码对应子消息码 key为pb对应消息包名称
local enum = {
    GameStatusReq      = 1,       --游戏状态数据请求
    GameStatusRes      = 2,       --游戏状态数据回复
    DoingReq           = 3,       --操作请求

    EnterCast         = 80,      --坐下广播
    GameStartCast     = 81,      --游戏开始
    NextDoingCast     = 82,      --接下来谁操作
    GameOverCast      = 83,      --游戏结束
    LeaveCast         = 84,      --离开
    DoingCast         = 85,      --操作通知
}

return enum