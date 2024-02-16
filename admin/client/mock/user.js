

const Mock = require('mockjs')
const crypto = require('crypto');

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Super Admin',
    last_login_time: 0,
  },
  'developer-token': {
    roles: ['developer'],
    introduction: 'I am an developer',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Normal developer',
    last_login_time: 0,
  }
}

const userList = [
  {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Super Admin',
    last_login_time: 0,
  },
  {
    roles: ['developer'],
    introduction: 'I am an developer',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Normal developer',
    last_login_time: 0,
  }
]

let challenge = ''
let clinet_key = ''
let server_key = ''
let share_secret = ''


module.exports = [
  
  {
    url: '/user/handshake',
    type: 'post',
    response: config => {
      console.log("user handshake>>>>>>>>>>>>>>>>>>>>>>>>>>", config.body)
      let data = ''
      if (challenge.length <= 0) {
        challenge = crypto.randomBytes(8)
        data = challenge.toString('base64')
      }else if (clinet_key.length <= 0) {
        clinet_key = Buffer.from(config.body.key, 'base64')
        server_key = config.body.server_key
        data = server_key
        share_secret = Buffer.from(config.body.server_secret, 'base64')
        console.log("server server_key:",server_key)
        console.log("server share_secret:",share_secret.toString('base64'))
      } else {
        let clg = config.body.challenge
        const hmac = crypto.createHmac('sha256', share_secret)
        hmac.update(challenge)
        const hash = hmac.digest('base64');
        console.log('clg:', clg, hash)
        data = "OK"
      }

      return {
        code: 20000,
        data: data
      }
    }
  },
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      challenge = ''
      clinet_key = ''
      server_key = ''
      share_secret = ''
      return {
        code: 20000,
        data: {
          token : "admin-token"
        }
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
      console.log("info >>>>>",info)
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // user list
  {
    url: '/user/list',
    type: 'get',
    response: _=> {
      return {
        code: 20000,
        data: userList
      }
    }
  },

  // add user
  {
    url: '/user/add',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },
  
  // update user
  {
    url: '/user/up/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete user
  {
    url: '/user/del/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
