local db1 = {
    host = '127.0.0.1',
    port = 6379,
    auth = '123456',
    db = 0,
}

local M = {}

M.rpc = db1
return M