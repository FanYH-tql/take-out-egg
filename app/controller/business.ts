import { Controller } from 'egg'
import response from '../utils/response'
const createInsertRule = {
  business_servetime: 'string',
  business_address: 'string',
  category_id: 'number',
  business_image: 'string',
  business_longitude: 'number',
  business_latitude: 'number',
  business_name: 'string',
  business_phone: 'string'
}
class BusinessController extends Controller {
  public async category() {
    const ctx = this.ctx
    const res = await ctx.service.business.category()
    response(ctx, 200, '', res)
  }

  public async create() {
    const ctx = this.ctx
    ctx.validate(createInsertRule)
    const res = await ctx.service.business.create(ctx.request.body)
    if (res.affectedRows === 1) {
      response(ctx, 200, '新建成功', res)
    } else {
      response(ctx, 599, '新建失败', res)
    }
  }

  public async list() {
    const ctx = this.ctx
    const res = await ctx.service.business.list()
    response(ctx, 200, '', {
      data: res.map(item => {
        delete item.business_password
        return item
      }),
      pageSize: 10,
      pageNo: 0,
      totalPage: Math.ceil(res.length / 10),
      totalCount: res.length
    })
  }

  public async update() {
    const ctx = this.ctx
    const res = await ctx.service.business.update(ctx.request.body)
    if (res.affectedRows === 1) {
      response(ctx, 200, '保存成功', {})
    }
  }

  public async delete() {
    const ctx = this.ctx
    const id = ctx.query.business_id
    const account = ctx.query.business_account
    if (id && account) {
      const res = await ctx.service.business.delete({
        id,
        account
      })
      if (res.every(e => e.affectedRows === 1)) {
        response(ctx, 200, '删除成功', {})
      } else {
        response(ctx, 612, '删除失败', {})
      }
    }
  }
}
export default BusinessController
