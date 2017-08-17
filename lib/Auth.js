
const _ = require('lodash')
const API = require('./API')

class Auth extends API {
  constructor(server) {
    super(server)
    this.token = server.token
  }

  async login(options) {
    if (!options.account || !options.passwd) {
      console.error('login opitions miss account and passwd')
      return;
    }
    let authOptions = {
      cgi: 'auth',
      api: 'SYNO.API.Auth',
      method: 'login',
      version: 2,
      format: 'sid'
    }
    authOptions = _.assignIn(authOptions, {
      account: options.account,
      passwd: options.passwd
    })
    const result = await super.request(authOptions)
    this.token = result.data.data.sid
    return result.data
  }
}

module.exports = Auth

