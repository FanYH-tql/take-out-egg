import { Service } from 'egg'
import transaction from '../utils/transaction'
namespace OrderParams {
  export interface CreateBody {
    id?: number
    business_id: number
    goods_list: string
    openid: string
    phone: string
    address: string
    name: string
    status: number
    total: number
    mode: number
    pay_status: number
    time: string
    isComment: number
  }
}
export default class OrderService extends Service {
  public async create(params: OrderParams.CreateBody) {
    return transaction(this, async conn => {
      await conn.insert('order', params)
      const res = await conn.query('SELECT LAST_INSERT_ID()')
      return res
    })
  }


  public async list(query) {
    return transaction(this, async conn => {
      if (query.openid) {
        const openid = query.openid
        const list = await conn.select('order', {
          openid
        })
        const goodsList = await conn.select('goods')
        // [...new Set(Object.keys(goodsMap))]
        const arr = list.map(item => {
          const goodsMap = item.goods_list.split(',').reduce((obj, e) => {
            const arr = e.split('=')
            return (obj[arr[0]] = +arr[1], obj)
          }, {})
          const goods_list = goodsList.filter(e => [...new Set(Object.keys(goodsMap))].includes(e.goods_id + ''))
          return {
            ...item,
            goods_list,
            goodsMap
          }
        })
        return arr
      } else if (Object.keys(query).length === 0) {
        const list = await conn.select('order')
        return {
          data: list,
          pageSize: 10,
          pageNo: 0,
          totalPage: Math.ceil(list.length / 10),
          totalCount: list.length
        }
      } else if (query.business_id) {
        const list = await conn.select('order', {
          where: {
            business_id: +query.business_id
          }
        })
        return {
          data: list,
          pageSize: 10,
          pageNo: 0,
          totalPage: Math.ceil(list.length / 10),
          totalCount: list.length
        }
      }
    })
  }


  public async pay(id: number) {
    return transaction(this, async conn => {
      const res = await conn.update('order', {
        pay_status: 1
      }, {
        where: {
          id
        }
      })
      const order = await conn.get('order', {
        id
      })
      if (order) {
        const business_id = order.business_id
        await conn.query('update business set business_sale = business_sale + 1 where business_id = ?', [business_id])
      }
      return res
    })
  }

  public async delete(id: number) {
    return transaction(this, async conn => {
      await conn.delete('order', {
        id
      })
      return
    })
  }
}
