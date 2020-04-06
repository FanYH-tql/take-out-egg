import { Service } from 'egg'
import transaction from '../utils/transaction'
namespace AssessParams {
  export interface CreateBody {
    evaluate_id?: number
    evaluate_content: string
    evaluate_time: string
    evaluate_score: number
    parent_id: number
    openid: string
    business_id: number
    order_id: number
  }
}
export default class AssessService extends Service {
  public async create(params: AssessParams.CreateBody) {
    return transaction(this, async conn => {
      await conn.insert('assess', {
        ...params
      })
      await conn.update('order', {
        isComment: 1
      }, {
        where: {
          id: params.order_id
        }
      })
      const res = await conn.query('SELECT LAST_INSERT_ID()')
      return res
    })
  }

  public async list(id: number) {
    return transaction(this, async conn => {
      const assessList = await conn.select('assess', {
        where: {
          business_id: id
        }
      })
      let ids = []
      if (assessList.length > 0) {
        ids = assessList.map(item => item.openid)
        const users = await conn.select('customer', {
          where: {
            openid: ids
          },
          columns: ['avatarUrl', 'nickName', 'openid']
        })
        return {
          list: assessList,
          users
        }
      } else {
        return {
          list: [],
          users: []
        }
      }
    })
  }

  public async reply(body) {
    return transaction(this, async conn => {
      await conn.insert('assess', {
        ...body
      })
    })
  }

  public async delete(id) {
    return transaction(this, async conn => {
      await conn.query('delete from assess where evaluate_id = ? or parent_id = ?', [ id, id ])
    })
  }
}
