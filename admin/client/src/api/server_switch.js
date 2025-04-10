import request from '@/utils/request'

export function getInfos() {
  return request({
    url: '/server_switch/infos',
    method: 'get',
  })
}

export function change_switch(data) {
    return request({
      url: '/server_switch/change_switch',
      method: 'post',
      data
    })
}