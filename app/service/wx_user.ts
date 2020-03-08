import { Service } from 'egg'
import transaction from '../utils/transaction'
namespace UploadParams {
  export interface UpdateBody {
    openid: string
    avatarUrl: string
    city: string
    country: string
    gender: number
    language: string
    nickName: string
    province: string
    session_key: string
  }
}
export default class WXUserService extends Service {
  public async update(params: UploadParams.UpdateBody) {
    return transaction(this, async conn => {
      const r1 = await conn.get('customer', {
        openid: params.openid
      })
      let r2
      if (!r1) {
        r2 = await conn.insert('customer', params)
      } else {
        r2 = await conn.update('customer', params, {
          where: {
            openid: params.openid
          }
        })
      }
      return r2
    })
  }
}
