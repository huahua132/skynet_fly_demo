import request from '@/utils/request'

export function getNodeList() {
  return request({
    url: '/dashboard/node_list',
    method: 'get',
  })
}

export function getOnlineRecord(svr_name,pre_day) {
  return request({
    url: '/dashboard/online_record',
    method: 'get',
    params: { 
      svr_name : svr_name,
      pre_day : pre_day
    }
  })
}