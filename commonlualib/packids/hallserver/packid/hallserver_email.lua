--这里是主码对应子消息码 key为pb对应消息包名称
local enum = {
    ReadEmailReq       = 1,       --请求已读
    ReadEmailRes       = 2,       --回复已读
    ItemListEmailReq   = 3,       --领取道具列表
    ItemListEmailRes   = 4,       --回复领取道具列表
    DelEmailReq        = 5,       --删除邮件
    DelEmailRes        = 6,       --回复删除邮件

    AllEmailNotice     = 80,      --通知所有邮件
    OneEmailNotice     = 81,      --通知一条邮件
    DelEmailNotice     = 82,      --通知删除邮件
}

return enum