--这里是主码对应子消息码 key为pb对应消息包名称
local enum = {
    gameStateReq       = 1,       --游戏状态数据请求
    gameStateRes       = 2,       --游戏状态数据回复
    moveReq            = 3,       --请求移动棋子
    moveRes            = 4,       --回复移动棋子

    nextDoing         = 80,       --通知接下来操作
}

return enum