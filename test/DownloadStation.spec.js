import DownloadStation from '../lib/DownloadStation'
import {expect} from 'chai';

describe('DownloadStation API', () => {
  const ds = new DownloadStation(
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
  it('downloadStation tasks list', async function () {
    const result = await ds.login({
      account: 'brpoper',
      passwd: 'xxxxx'
    })
    const sid = result.data.sid
    expect(ds.token).to.equal(sid)
    const tasks = await ds.getTasks()
    expect(tasks.success).to.equal(true)
  })
})
