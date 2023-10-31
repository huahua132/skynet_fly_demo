local model_table = require "model_table"

return function(group)
    group:get("/list",function(c)
        local items = model_table.generate_items()
        local rsp = {
            code = 20000,
            data = {
                items = items
            }
        }
        c.res:set_json_rsp(rsp)
    end)
end