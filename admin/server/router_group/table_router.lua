local model_table = require "model_table"
local rsp_body = require "rsp_body"

return function(group)
    group:get("/list",function(c)
        local items = model_table.generate_items()
        rsp_body.set_rsp(c,{
            items = items
        })
    end)
end