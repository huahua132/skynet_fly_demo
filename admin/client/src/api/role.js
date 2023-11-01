import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/role/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/role/${id}`,
    method: 'delete'
  })
}
