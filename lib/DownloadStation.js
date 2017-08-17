const AuthedAPI = require('./AuthenticatedAPI')
const _ = require('lodash')

class DownloadStation extends AuthedAPI {
  constructor(server) {
    super(server)
    this.server = server
  }

  async get(params) {
    const res = await super.request(params)
    if (res.data.error) {
      const errCode = res.data.error.code
      const errMsg = errorToMsg(errCode)
      return _.assignIn(res.data,{error:{msg: errMsg}})
    }
    return res.data
  }

  errorToMsg(code) {
    const codeMsg = {
      400: 'File upload failed',
      401: 'Max number of tasks reached',
      402: 'Destination denied',
      403: 'Destination does not exist',
      404: 'Invalid task id',
      405: 'Invalid task action',
      406: 'No default destination',
      407: 'Set destination failed',
      408: 'File does not exist'
    }
    return codeMsg[code]
  }

  async getInfo(params) {
    const options = {
      cgi: 'info',
      api: 'SYNO.DownloadStation.Info',
      version: 1,
      method: 'getInfo'
    }

    return await
    super.request(_.assignIn(options, params))
  }

  async setServerConfig(params) {
    const options = {
      cgi: 'info',
      api: 'SYNO.DownloadStation.info',
      version: 1,
      method: 'setserverconfig'
    }

    return await super.request(_.assignIn(options, params))
  }

  async getTasks(params) {
    params = params || {}
    const options = {
      cgi: 'task',
      name: 'DownloadStation',
      api: 'SYNO.DownloadStation.Task',
      version: 1,
      method: 'list',
      additional: 'detail,file'
    }

    return await super.request(_.assignIn(options, params))
  }

}

module.exports = DownloadStation

