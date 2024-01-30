module.exports = [
    {
        url: '/warnlog/info',
        type: 'get',
        response: config => {
        return {
            code: 20000,
            data: {
                result : "OK",
                context : "warnlogssssssssssss>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
            }
        }
        }
    },
]