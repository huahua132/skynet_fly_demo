
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
            run_time : 895110,
            server_info : {
                hot_container : {
                    module_info : {
                        launch_date : '2023-11-08[16:59:55]',
                        module_name : 'room_game',
                        version : 1,
                        index : 1,
                    },
                    server_state : 'starting',
                    exit_remain_time : 0,
                    source_map : {
                        "22" : "room_game",
                        "33" : "hall",
                        "44" : "alloc",
                    },
                    week_visitor_map : {
                        "hall" : true,
                    },
                    need_visitor_map : {
                        "hall" : [[22,24],[25,26]],
                        "game" : [[27],[28]],
                    },
                }
            }
        }
    }
    }
},

]
