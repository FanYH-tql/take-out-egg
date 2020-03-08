import { Controller } from 'egg'
import response from '../utils/response'
import config from '../constants'
import { getSessionKey } from '../utils/wxlogin'
class WXUserController extends Controller {
  public async login() {
    const ctx = this.ctx
    const { code, ...userinfo } = ctx.request.body
    const { session_key, openid } = await getSessionKey(code, config.appid, config.appSecret)
    await ctx.service.wxUser.update({ openid, ...userinfo })
    response(ctx, 200, '', {
      ...userinfo,
      openid,
      session_key
    })
  }
}
export default WXUserController
