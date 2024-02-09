import Cookies from 'js-cookie'

const TokenKey = 'token'
const username = "username"

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserName() {
  return Cookies.get(username)
}

export function setUserName(name) {
  return Cookies.set(username, name)
}

export function removeUserName() {
  return Cookies.remove(username)
}
