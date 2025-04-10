local enum = {
    CLOSE = 0,      --关闭状态
    WHITE = 1,      --白名单
    OPEN  = 2,      --开启
}

for k,v in pairs(enum) do
    enum[v] = k
end

return enum