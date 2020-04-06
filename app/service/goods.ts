import { Service } from 'egg'
import transaction from '../utils/transaction'
namespace GoodsParams {
  export interface CreateBody {
    business_id: number
    goods_detail: string
    goods_discount: number
    goods_image: string
    goods_name: string
    goods_price: number
    goods_sale: number
    goods_id?: number
  }
  export interface DeleteBody {
    business_id: number
    goods_id: number
  }
}
export default class GoodsService extends Service {
  public async create(body: GoodsParams.CreateBody) {
    return transaction(this, async conn => {
      body.goods_sale = 0
      await conn.insert('goods', {
        ...body
      })
    })
  }

  public async list(business_id: string) {
    return transaction(this, async conn => {
      const res = await conn.select('goods', {
        where: {
          business_id
        }
      })
      return res
    })
  }
  
  public async some(params) {
    return transaction(this, async conn => {
      const res = await conn.select('goods', {
        where: {
          goods_id: params.ids
        }
      })
      return res
    })
  }

  public async delete(body: GoodsParams.DeleteBody) {
    return transaction(this, async conn => {
      const res = await conn.delete('goods', body)
      return res
    })
  }

  public async update(body: GoodsParams.CreateBody) {
    return transaction(this, async conn => {
      const res = await conn.update('goods', body, {
        where: {
          goods_id: body.goods_id
        }
      })
      return res
    })
  }
}
