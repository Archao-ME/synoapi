const axios = require('axios')
const _ = require('lodash')
const Auth = require('./Auth')

class AuthenticatedAPI extends Auth {
  constructor(server) {
    super(server)
    if (server.token) {
      this.token = server.token
    }
  }

  setToken(token) {
    this.token = token
  }

  async request(option) {
    const reqToken = option.token || option._sid || this.token
    if (!reqToken) {
      console.error('请先进行登陆或者传入可用token')
      return {
        data: {
          success: false,
          error: {
            msg: 'Please request with token'
          }
        }
      }
    }
    const preOption = {'_sid': reqToken}
    option = _.assignIn(preOption, option)
    const url = super.getAPIUrl(option)
    const res = await axios(url, this.requestOption)
    return res.data
  }
}

module.exports = AuthenticatedAPI
