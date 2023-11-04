import request from '@/utils/request'

export function get_cluster_list() {
  return request({
    url: '/monitor/cluster_list',
    method: 'get',
  })
}

export function getInfo(cluster,pre_day) {
  return request({
    url: '/monitor/info',
    method: 'get',
    params: { 
        cluster_name : cluster,
        pre_day : pre_day
    }
  })
}
