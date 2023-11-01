local model_table = require "model_table"
local rsp_body = require "rsp_body"

return function(group)
    group:get("/list",function(c)
        local items = model_table.generate_items()
        
        local rsp = rsp_body.ok_rsp({
            items = items
        })
        c.res:set_json_rsp(rsp)
    end)
end