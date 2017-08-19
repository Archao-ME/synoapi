import AuthenticatedAPI from '../lib/AuthenticatedAPI'
import {expect} from 'chai'
import _ from 'lodash'

describe('AuthenticatedAPI', () => {
  const authedAPI = new AuthenticatedAPI(
    {
      protocol: "http",
      address: "192.168.3.133",
      port: "5000",
      username: "",
      password: "",
      debug: false,
      token: "",
      success: false,
      message: ""
    }
  )
  const options = {
    cgi: 'task',
    name: 'DownloadStation',
    api: 'SYNO.DownloadStation.Task',
    version: 1,
    method: 'list',
    additional: 'detail,file'
  }

  it('request without token, ask login', async function () {
    const result = await authedAPI.request(options)
    expect(result.data).to.deep.equal({
      success: false,
      error: {
        msg: 'Please request with token'
      }
    })
  })

  it('request with token', async function () {
    const token = '64pdCnDbQR5jg1690O6N720701'
    const reqParams = _.assignIn(options, {token: '64pdCnDbQR5jg1690O6N720701'})
    const result = await authedAPI.request(options)
    expect(result.success).to.equal(true)
  })

  it('request with login', async function () {
    const loginAPI = new AuthenticatedAPI(
      {
        protocol: "http",
        address: "192.168.3.133",
        port: "5000",
        username: "",
        password: "",
        debug: false,
        token: "",
        success: false,
        message: ""
      }
    )
    const result = await loginAPI.login({
      account: 'brpoper',
      passwd: '1313113'
    })
    const sid = result.data.sid
    expect(loginAPI.token).to.equal(sid)
    const downloadListResult = await loginAPI.request(options)
    expect(downloadListResult.success).to.equal(true)
  })

})
