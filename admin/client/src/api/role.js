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

export function updateRole(name, data) {
  return request({
    url: `/role/role/${name}`,
    method: 'put',
    data
  })
}

export function deleteRole(name) {
  return request({
    url: `/role/role/${name}`,
    method: 'delete'
  })
}
