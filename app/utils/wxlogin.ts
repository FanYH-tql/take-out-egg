import axios from 'axios'
import crypto from 'crypto'
function encryptSha1(data) {
  return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
}

export async function getSessionKey (code, appid, appSecret) {
  const res = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    params: {
      appid,
      secret: appSecret,
      js_code: code,
      grant_type: 'authorization_code'
    }
  })
  if (res.data.session_key) {
    return {
      ...res.data,
      session_key: encryptSha1(res.data.session_key)
    }
  }
  return res.data
}