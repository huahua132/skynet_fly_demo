local M = {}

function M.login()
    return "ABC"
end

function M.get_info()
    return {
        username = "admin",
        roles = {"admin"},
        introduction = "I am a super administrator",
        avatar = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        name = "Super Admin",
    }
end

return M