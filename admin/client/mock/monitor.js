
const cluster_list = ['chinese_chess:1','chinese_chess:2']

const lineChartData = [
    {
        ['00:00:00'] : {
            cdummy12: {mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 2171},
            cdummy13: {mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 2171},
            cdummy14: {mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 2171},
            cdummy15: {mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 2171},
        }
    },
    {
        ['00:01:00'] : {
            cdummy12: {mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 12171},
            cdummy13: {mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 12171},
            cdummy14: {mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 12171},
            cdummy15: {mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 12171},
        }
    },
    {
        ['00:02:00'] : {
            cdummy12: {mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 22171},
            cdummy13: {mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 22171},
            cdummy14: {mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 22171},
            cdummy15: {mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 22171},
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
        data: cluster_list
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
]
