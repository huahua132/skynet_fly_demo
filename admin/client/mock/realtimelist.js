
const cluster_list = ['chinese_chess:1','chinese_chess:2']

const lineChartData = {
    [':00000001'] : {
        mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 2171,name : 'gate',
    },
    [':00000002'] : {
        mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 2171,name: 'hall',
    },
    [':00000003'] : {
        mqlen: 0, task: 0, mem: 76.73, cpu: 0.030258, message: 2171,name :'alloc',
    }
}
  
module.exports = [
{
    url: '/realtimelist/cluster_list',
    type: 'get',
    response: config => {
    return {
        code: 20000,
        data: {
            cluster_list : cluster_list,
        }
    }
    }
},

{
    url: '/realtimelist/info',
    type: 'get',
    response: config => {
    return {
        code: 20000,
        data: lineChartData
    }
    }
},
]
