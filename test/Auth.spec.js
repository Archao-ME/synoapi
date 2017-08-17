import Auth from '../lib/Auth'
import {expect} from 'chai';

describe('Auth', () => {
  const auth = new Auth(
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
  it('Login return sid obj',async function () {
    const result = await auth.login({
      account: 'brpoper',
      passwd: '1313113'
    })
    expect(result.success).to.be.true
  })
})
