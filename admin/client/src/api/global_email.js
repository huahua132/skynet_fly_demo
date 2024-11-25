import request from '@/utils/request'

export function list() {
  return request({
    url: '/global_email/list',
    method: 'get',
  })
}

export function add(data) {
  return request({
    url: '/global_email/add',
    method: 'post',
    data
  })
}

export function update(data) {
    return request({
      url: `/global_email/update/${data.guid}`,
      method: 'put',
      data
    })
  }

export function del(guid) {
  return request({
    url: `/global_email/del/${guid}`,
    method: 'delete'
  })
}

export function item_list() {
    return request({
        url: 'global_email/itemList',
        method: 'get'
    })
}