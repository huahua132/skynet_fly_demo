module.exports = [
    {
        url: '/warnlog/list',
        type: 'post',
        response: config => {
        return {
            code: 20000,
            data: {
                cursor : 1,
                list : [_guid = "1", _time = 10, _svr_type = 1, _svr_id = 1, _err_str = "xxxx"],
                count : 0,
            }
        }
        }
    },
]