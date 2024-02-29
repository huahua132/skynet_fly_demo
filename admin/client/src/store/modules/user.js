import { handshake, login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setUserName } from '@/utils/auth'
import router, { resetRouter } from '@/router'
const ECDHCrypto = require('ecdh-crypto');
const crypto = require('crypto')

const state = {
  token: getToken(),
  username: '',
  avatar: '',
  introduction: '',
  roles: [],
  secret : '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_SECRET: (state, secret) => {
    state.secret = secret
  }
}

const actions = {
  // user login
  login({ commit, state }, userInfo) {
    let dh = ECDHCrypto.createECDHCrypto()
    let serverdh = ECDHCrypto.createECDHCrypto()    //mock那边创建在这里创建，正常是服务端创建的
    let challenge = ''
    return new Promise((resolve, reject) => {
      handshake({}).then(response => {
        const { data } = response
        challenge = Buffer.from(data, 'base64')

        let server_key = serverdh.asPublicECDHCrypto()
        let client_key = dh.asPublicECDHCrypto()
        console.log("handshake 1 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:", challenge, client_key)
        let server_ecdh = serverdh.createECDH()
        let server_shared_secret = server_ecdh.computeSecret(dh.publicCodePoint)
        console.log("ssssssssssssssssss>>>>>>>>>>", server_shared_secret.toString('base64'))
        console.log("handshake 2 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", client_key.toString('pem'), server_key.toString('pem'))
        return handshake({key : client_key.toString('pem'), server_key : server_key.toString('pem'), server_secret : server_shared_secret.toString('base64')})
      }).then(response => {
        const { data } = response
        console.log("server key1:", data)
        let server_dh = new ECDHCrypto(data, 'pem')
        let client_ecdh = dh.createECDH()
        let shared_secret = client_ecdh.computeSecret(server_dh.publicCodePoint)
        console.log("server key2:", shared_secret.toString('base64'))
        const hmac = crypto.createHmac('sha256', shared_secret)
        commit('SET_SECRET', shared_secret)
        hmac.update(challenge)
        const hash = hmac.digest('hex');
        console.log("hash:",hash)
        return handshake({challenge : hash})
      }).then(response => {
        const { data } = response
        if (data != "OK") {
          reject('handshake failed, please Login again.')
        }
       
        const { username, password } = userInfo
        console.log("login >>>>>1", username, password)
        let token = btoa(username) + "@" + btoa(password)
        console.log("login >>>>>2", token, state.secret)
        let iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-gcm', state.secret, iv)
        console.log("login >>>>>3", cipher)
        let encrypted = cipher.update(token, 'utf8', 'base64')
        console.log("login >>>>>4", encrypted)
        encrypted += cipher.final('base64')
        console.log("login >>>>>5", encrypted)
        const tag = cipher.getAuthTag();
        console.log("login>>>>>>>>>>>>>>", encrypted, tag)
        commit('SET_NAME', username)
        return login({ token : encrypted, iv : iv.toString('base64'), tag : tag.toString('base64') })
      }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        console.log("set username:", state.username)
        setUserName(state.username)
        resolve()
      }).catch(error => {
        // 处理任何步骤中发生的错误
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, username, avatar, introduction } = data
        console.log("roles>>>",roles,data)
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const userinfo = await dispatch('getInfo')
    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', userinfo)
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
