import request from '@/utils/request'

export function getlist(data) {
  return request({
    url: '/warnlog/list',
    method: 'post',
    data
  })
}