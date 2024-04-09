
const node_map = {
    "hallserver" : {
        "online" : true,
    },
    "chinese_chess" : {
        "online" : true
    },
}

const lineChartData = [
    {
        ['00:00:00'] : {"server-2":2492,"total":5001,"server-1":2509,"channel-9999":5001}
    },
    {
        ['00:01:00'] : {"server-2":492,"total":501,"server-1":259,"channel-9999":501}
    },
    {
        ['00:02:00'] : {"server-2":2492,"total":5001,"server-1":2509,"channel-9999":5001}
    },
]
  
module.exports = [
{
    url: '/dashboard/node_map',
    type: 'get',
    response: config => {
    console.log("user node_map>>>>>>>>>>>>>>>>>>>>>>>>>>")
    return {
        code: 20000,
        data: {
            node_map : node_map,
        }
    }
    }
},

{
    url: '/dashboard/online_record',
    type: 'get',
    response: config => {
    return {
        code: 20000,
        data: {
            result : "OK",
            data : lineChartData
        }
    }
    }
},

]
