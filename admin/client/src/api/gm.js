import request from '@/utils/request'

export function gm_help(find_name) {
  return request({
    url: `/gm/help/${find_name}`,
    method: 'get',
  })
}

export function gm_debug(data) {
  return request({
    url: '/gm/debug',
    method: 'post',
    data
  })
}