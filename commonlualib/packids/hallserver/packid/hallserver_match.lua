--这里是主码对应子消息码 key为pb对应消息包名称
local enum = {
    MatchGameReq       = 1,       --请求匹配
    MatchGameRes       = 2,       --回应匹配
    CancelMatchGameReq = 3,       --取消匹配
    CancelMatchGameRes = 4,       --回应取消匹配
    AcceptMatchReq     = 5,       --请求接受匹配
    AcceptMatchRes     = 6,       --回应接受匹配

    MatchGameNotice    = 80,      --通知匹配成功
    JoinGameNotice     = 81,      --通知进入游戏
}

return enum