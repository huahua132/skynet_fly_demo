import request from '@/utils/request'

export function get_cluster_list() {
  return request({
    url: '/realtimelist/cluster_list',
    method: 'get',
  })
}

export function getInfo(cluster,server,pre_day) {
  return request({
    url: '/realtimelist/info',
    method: 'get',
    params: { 
      server_name : server,
      cluster_name : cluster,
      pre_day : pre_day
    }
  })
}