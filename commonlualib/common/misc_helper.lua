local skynet = require "skynet"

local is_prod = string.find(skynet.getenv('loadmodsfile'), 'prod', nil, true)

local M = {}

--是否正式环境
function M.is_prod()
    return is_prod
end

return M