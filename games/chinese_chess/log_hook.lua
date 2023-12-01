local log = require "log"

return function(log_str)
    local log_info = log.parse(log_str)
    local log_type = log_info.log_type
    if log_type == log.FATAL or log_type == log.TRACEBACK then

    end
end