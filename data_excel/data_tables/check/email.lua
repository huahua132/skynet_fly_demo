local email_sys = require "lua.email_sys"

return {
    export = {
        ["email_sys"] = {EXPORT_TARGET.hallserver},
    },
    check_func = function()
        
    end
}