local player_level = require "lua.player_level"

for i, cfg in pairs(player_level) do
    assert(cfg.level >= 0, "等级配置不能小于 0  i = " .. i)
    assert(cfg.exp >= 0, "经验不能小于0 i =" .. i)
end

return {
    ["player_level"] = EXPORT_TARGET.hall_server,
}