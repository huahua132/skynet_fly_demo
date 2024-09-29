local chess_type = require "lua.chess_type"

return {
    export = {
        ["chess_type"] = {EXPORT_TARGET.chinese_chess},
    },
    check_func = function()
        for _,cfg in pairs(chess_type) do
            INTERFACE.item.check_rewards(cfg.win_rewards)
            INTERFACE.item.check_rewards(cfg.fail_rewards)
        end
    end
}