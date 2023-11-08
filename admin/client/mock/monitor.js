
const cluster_list = ['chinese_chess:1','chinese_chess:2']
const server_map = {
    ['chinese_chess:1'] : ['gate','hall','match'],
    ['chinese_chess:2'] : ['gateddd','hallddd','matchdd'],
}

const lineChartData = [
    {
        ['00:00:00'] : {
            mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 2171,
        }
    },
    {
        ['00:01:00'] : {
            mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 2171,
        }
    },
    {
        ['00:02:00'] : {
            mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 2171,
        }
    },
]
  
module.exports = [
{
    url: '/monitor/cluster_list',
    type: 'get',
    response: config => {
    console.log("user cluster_list>>>>>>>>>>>>>>>>>>>>>>>>>>")
    return {
        code: 20000,
        data: {
            cluster_list : cluster_list,
            server_map : server_map,
        }
    }
    }
},

{
    url: '/monitor/info',
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

{
    url: '/monitor/serverinfo',
    type: 'get',
    response: config => {
    return {
        code: 20000,
        data: {
            run_time : 3600,
        }
    }
    }
},

]
