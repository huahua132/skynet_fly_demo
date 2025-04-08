import request from '@/utils/request'

export function getLogNameList() {
  return request({
    url: '/log_pannel/log_name_list',
    method: 'get',
  })
}

export function getLogDesc(logname) {
    return request({
      url: `/log_pannel/log_desc/${logname}`,
      method: 'get',
    })
}

export function getLogList(data) {
    return request({
      url: '/log_pannel/log_list',
      method: 'post',
      data
    })
}