import request from '@/utils/request'

export function handshake(data) {
  return request({
    url: '/user/handshake',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function list() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function addUser(user) {
  return request({
    url: '/user/add',
    method: 'post',
    user
  })
}

export function updateUser(name, data) {
  return request({
    url: `/user/up/${name}`,
    method: 'put',
    data
  })
}

export function deleteUser(name) {
  return request({
    url: `/user/del/${name}`,
    method: 'delete'
  })
}
