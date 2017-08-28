import API from '../lib/API'
import {expect} from 'chai';

describe('API', () => {
  const api = new API(
    {
      protocol: "http",
      address: "127.0.0.1",
      port: "5000",
      username: "",
      password: "",
      debug: false,
      token: "",
      success: false,
      message: ""
    }
  )
  it('get api Url', () => {
    const url = api.getAPIUrl(
      {
        cgi: 'task',
        name: 'DownloadStation',
        api: 'SYNO.DownloadStation.Task',
        version: 1,
        _sid: 'XhO7z.Oq6N01.1690O6N720701'
      }
    )
    expect(url).to.be.contains('api=SYNO.DownloadStation.Task', 'DownloadStation/', 'task.cgi', '127.0.0.1')
  })
  it('get api Url without Host', () => {
    const url = api.getAPIUrl(
      {
        cgi: 'task',
        name: 'DownloadStation',
        api: 'SYNO.DownloadStation.Task',
        version: 1,
        _sid: 'XhO7z.Oq6N01.1690O6N720701'
      },
      true
    )
    console.log(url)
    expect(url).to.be.contains('api=SYNO.DownloadStation.Task', 'DownloadStation/', 'task.cgi',)
    expect(url).not.contains('127.0.0.1')
  })
})
