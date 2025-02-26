local chess_type = require "lua.chess_type"
local chess_rank = require "lua.chess_rank"
local chess_param = require "lua.chess_param"

return {
    export = {"chess_type", "chess_rank", "chess_param"},
    check_func = function()
        for _,cfg in pairs(chess_type) do
            INTERFACE.item.check_rewards(cfg.win_rewards)
            INTERFACE.item.check_rewards(cfg.fail_rewards)
        end
    end
}