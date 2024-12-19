local log = require "skynet-fly.log"
local skynet = require "skynet"
local contriner_client = require "skynet-fly.client.contriner_client"

contriner_client:register("robot_m")
--机器人启动

local CMD = {}

function CMD.start(config)
    local robot_num = config.robot_num  --机器人启动数量

    skynet.fork(function()
        local cli = contriner_client:new("robot_m")
        for i = 1, robot_num do
            cli:set_mod_num(i)
            skynet.sleep(10)
            cli:mod_send("launch", i)
        end
    end)

    return true
end

function CMD.exit()
    return true
end

return CMD