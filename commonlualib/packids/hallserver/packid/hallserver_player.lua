--这里是主码对应子消息码 key为pb对应消息包名称
local enum = {
    HeartReq         = 1,              --心跳
    PlayerInfoNotice = 80,             --玩家信息通知
    PlayerInfoSynNotice = 81,          --玩家字段信息同步
}

return enum