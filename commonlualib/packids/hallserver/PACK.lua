--这里是公共的消息码主码 key为pb协议的packname
--本服独有协议 占用 101-654
local enum = {
    hallserver_player = 101,             --玩家信息
    hallserver_item = 102,               --玩家道具
    hallserver_match = 103,              --匹配
    hallserver_friend = 104,             --好友
    hallserver_game_record = 105,        --游戏记录
    hallserver_email = 106,              --邮件
}

return enum