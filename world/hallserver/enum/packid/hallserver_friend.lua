--这里是主码对应子消息码 key为pb对应消息包名称
local enum = {
    FriendListReq      = 1,       --请求好友列表
    FriendListRes      = 2,       --回复好友列表
    AddFriendReq       = 3,       --请求添加好友
    AddFriendRes       = 4,       --回复添加好友
    AgreeAddFriendReq  = 5,       --同意添加好友请求
    AgreeAddFriendRes  = 6,       --同意添加好友回复

    AddReqListNotice   = 80,      --通知请求添加好友列表
}

return enum