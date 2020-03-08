import jwt from 'jsonwebtoken'
import response from '../utils/response'
export default (options: any, app) => {
  options = options || {}
  return async function userInterceptor(ctx, next) {
    const authToken = ctx.request.header['access-token'] // 获取header里的authorization
    if (authToken) {
      const res = verifyToken(authToken) as any // 解密获取的Token
      if (res.user_id) {
        // 如果需要限制单端登陆或者使用过程中废止某个token，或者更改token的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效
        // 此处使用redis进行保存
        const result = await app.mysql.get('user', { user_id: res.user_id })
        if (authToken === result.user_token) {
          ctx.session.user_id = res.user_id
          await next()
        } else {
          response(ctx, 403, '您的账号已在其他地方登录', {})
        }
      } else {
        response(ctx, 401, '登录状态已过期', {})
      }
    } else {
      response(ctx, 403, '请登陆后再进行操作', {})
    }
  }
}

// 解密，验证
function verifyToken(token) {
  let res = ''
  try {
    const result = jwt.verify(token, 'fanyihui') as any
    const { exp } = result,
    current = Math.floor(Date.now() / 1000)
    if (current <= exp) res = result.data || {}
  } catch (e) {
    console.log(e)
  }
  return res
}