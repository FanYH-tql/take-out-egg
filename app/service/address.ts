import { Service } from 'egg'
import transaction from '../utils/transaction'
namespace AddressParams {
  export interface CreateBody {
    address: string
    latitude: number
    longitude: number
    name: string
    phone: string
    detail: string
    default: boolean
    openid?: string
    id?: number
  }
}
export default class AddressService extends Service {
  public async create(params: AddressParams.CreateBody) {
    return transaction(this, async conn => {
      const all = await conn.select('address')
      let res
      if (all.length === 0) {
        res = await conn.insert('address', {
          ...params,
          default: 1
        })
      } else {
        res = await conn.insert('address', params)
      }
      return res
    })
  }

  public async list(openid: string) {
    return transaction(this, async conn => {
      const res = await conn.select('address', {
        where: {
          openid
        }
      })
      return res
    })
  }

  public async delete(id: number) {
    return transaction(this, async conn => {
      const res = await conn.delete('address', {
        id
      })
      return res
    })
  }

  public async update(params: AddressParams.CreateBody) {
    return transaction(this, async conn => {
      const res = await conn.update('address', {
        ...params
      }, {
        where: {
          id: params.id
        }
      })
      return res
    })
  }

  public async setDefault(query) {
    return transaction(this, async conn => {
      if (Object.keys(query).length > 0) {
        if (query.def === '1') {
          await conn.query('update address set default = 0 where default = 1')
          await conn.update('address', {
            default: 1
          }, {
            where: {
              id: +query.id
            }
          })
        } else {
          await conn.update('address', {
            default: 0
          }, {
            where: {
              id: +query.id
            }
          }) 
        }
      }
      const res = await conn.select('address')
      return res
    })
  }
}
