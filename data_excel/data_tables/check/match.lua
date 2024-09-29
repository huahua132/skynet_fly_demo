local match_game = require "lua.match_game"

return {
    export = {
        ["match_game"] = {EXPORT_TARGET.hallserver, EXPORT_TARGET.matchserver},
    },
    check_func = function()
       
    end
}