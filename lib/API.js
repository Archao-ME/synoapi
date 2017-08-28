const _ = require('lodash')
const axios = require('axios')

class API {
  constructor(server) {
    this.server = _.assignIn({
      protocol: "http",
      address: "localhost",
      port: "5000",
      username: "",
      password: "",
      debug: false,
      token: "",
      success: false,
      message: ""
    }, server)
    this.requestOption = {}
  }

  setRequestOption(params){
    this.requstOption = _.assignIn(this.requestOption, params)
    return this.requstOption
  }

  getAPIUrl(params, noHost) {
    const serverConfig = this.server
    let name = ''
    if (params.name) {
      name = params.name + '/'
    }
    let url = `${serverConfig.protocol}://${serverConfig.address}:${serverConfig.port}/webapi/${name}${params.cgi}.cgi?`
    if(noHost){
      url = `/webapi/${name}${params.cgi}.cgi?`
    }
    for (let key in params) {
      if (params[key]) {
        url = url + key + '=' + params[key] + '&'
      }
    }
    url = url.substring(0, url.length - 1)
    return url
  }

  request(url){
    return axios(this.getAPIUrl(url), this.requstOption)
  }
}

module.exports = API
