import { Service } from 'egg'
import transaction from '../utils/transaction'
import { BusinessCategory, Business } from '../types/business'
namespace BusinessParams { 
  export interface CreateBody {
    business_servetime: string
    business_address: string
    category_id: number
    business_image?: string
    business_longitude: number
    business_latitude: number
    business_name: string
    business_account: string
    business_password: string
  }
  
  export interface UpdateBody extends Business {
    [props: string]: any
  }
}
class BusinessService extends Service {
  public async category() {
    return transaction(this, async conn => {
      const res: BusinessCategory[] = await conn.select('category')
      return res
    })
  }

  public async create(body: BusinessParams.CreateBody) {
    return transaction(this, async conn => {
      const res = await conn.insert('business', {
        ...body,
        business_grade: 5,
        business_sale: 0
      })
      if (res.affectedRows === 1) {
        const maxID = await conn.query('select max(business_id) from business')
        const business_id = maxID && maxID[0] && maxID[0]['max(business_id)']
        await conn.insert('user', {
          user_name: body.business_account,
          user_password: body.business_password,
          role_id: 'business',
          user_avatar: body.business_image,
          business_id
        })
        await conn.insert('business_category', {
          business_id,
          category_id: body.category_id
        })
        return res
      }
    })
  }

  public async list() {
    return transaction(this, async conn => {
      const results = await conn.select('business', {
        orders: [[ 'business_id', 'desc' ]],
      })
      return results
    })
  }

  public async update(body: BusinessParams.UpdateBody) {
    return transaction(this, async conn => {
      const results = await conn.update('business', {
        ...body
      }, {
        where: {
          business_id: body.business_id
        }
      })
      if (body.business_password) {
        await conn.update('user', {
          user_password: body.business_password
        }, {
          where: {
            user_name: body.business_account
          }
        })
      }
      return results
    })
  }

  public async delete({ id, account }) {
    return transaction(this, async conn => {
      const p1 = conn.delete('business', {
        business_id: id
      })
      const p2 = conn.delete('user', {
        user_name: account
      })
      const res = await Promise.all([ p1, p2 ])
      return res
    })
  }
}
export default BusinessService