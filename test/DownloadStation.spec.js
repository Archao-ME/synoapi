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
      passwd: '1313113'
    })
    const sid = result.data.sid
    expect(ds.token).to.equal(sid)
    const tasks = await ds.getTasks()
    expect(tasks.success).to.equal(true)
  })
  it('create magnet link task', async function(){
    const result = await ds.createTask({
      destination: 'macosx/download',
      uri: 'magnet:?xt=urn:btih:e08543123e70ec016bf1c0c86f7366d272c3303c&dn=%5BThz.la%5Dabp-612&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2720%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2770%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2780%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce&tr=udp%3A%2F%2Ftracker.grepler.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.kuroy.me%3A5944%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.mg64.net%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.sith.su%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.vanitycore.co%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fscrape&tr=udp%3A%2F%2Fwww.eddie4.nl%3A6969%2Fannounce&tr=udp%3A%2F%2Fzephir.monocul.us%3A6969%2Fannounce'
    })
    console.log(result)
    expect(result.success).to.be.true
  })

  it('setRequestOption', async function () {
    ds.setRequestOption({headers:{
      socketName: 'brpoper'
    }})
    const result = await ds.getTasks()
    console.log(result)
    expect(result.success).to.be.true
  })
})
