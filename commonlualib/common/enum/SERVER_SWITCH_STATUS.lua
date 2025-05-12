local enum = {
    CLOSE      = 0,      --关闭状态          完全关服
    CLOSE_JOIN = 1,      --关闭入口状态      在游戏中的还可以登录
    WHITE      = 2,      --白名单            白名单模式
    OPEN       = 3,      --开启             完全开放
}

local new_enum = {}

for k,v in pairs(enum) do
    new_enum[v] = k
    new_enum[k] = v
end

enum = new_enum
new_enum = nil

return enum