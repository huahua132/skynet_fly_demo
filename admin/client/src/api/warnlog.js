import request from '@/utils/request'

export function getInfo(pre_day) {
  return request({
    url: '/warnlog/info',
    method: 'get',
    params: { 
      pre_day : pre_day,
    }
  })
}