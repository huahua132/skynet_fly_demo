import request from '@/utils/request'

export function get_cluster_list() {
  return request({
    url: '/realtimelist/cluster_list',
    method: 'get',
  })
}

export function getInfo(cluster) {
  return request({
    url: '/realtimelist/info',
    method: 'get',
    params: { 
      cluster_name : cluster,
    }
  })
}