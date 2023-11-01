local token_auth_mid = require "token_auth_mid"

local M = {}

function M.login(username, password)
    return token_auth_mid.create_token(username)
end

function M.get_info(username)
    return {
        username = "admin",
        roles = {"admin"},
        introduction = "I am a super administrator",
        avatar = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        name = "Super Admin",
    }
end

return M