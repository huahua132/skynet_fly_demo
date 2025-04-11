import request from '@/utils/request'

export function getInfos() {
  return request({
    url: '/server_switch/infos',
    method: 'get',
  })
}

export function changeSwitch(data) {
    return request({
      url: '/server_switch/change_switch',
      method: 'post',
      data
    })
}

export function changeAllSwitch(data) {
    return request({
      url: '/server_switch/change_all_switch',
      method: 'post',
      data
    })
}

export function getWhiteInfos() {
    return request({
      url: '/server_switch/white_info',
      method: 'get',
    })
}

export function addWhite(data) {
    return request({
      url: '/server_switch/add_white',
      method: 'post',
      data
    })
}

export function delWhite(data) {
    return request({
      url: '/server_switch/del_white',
      method: 'post',
      data
    })
}