import request from '@/utils/request'

export function getNodeMap() {
  return request({
    url: '/dashboard/node_map',
    method: 'get',
  })
}

export function getOnlineRecord(svr_name, date, tag) {
  return request({
    url: '/dashboard/online_record',
    method: 'get',
    params: { 
      svr_name : svr_name,
      date : date,
      tag : tag
    }
  })
}