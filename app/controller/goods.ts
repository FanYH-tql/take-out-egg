import { Controller } from 'egg'
import response from '../utils/response'

class GoodsController extends Controller {
  public async create() {
    const ctx = this.ctx
    await ctx.service.goods.create(ctx.request.body)
    response(ctx, 200, '添加成功', {})
  }

  public async list() {
    const ctx = this.ctx
    const { business_id } = ctx.query
    const res = await ctx.service.goods.list(business_id)
    response(ctx, 200, '', Array.from(res))
  }

  public async delete() {
    const ctx = this.ctx
    const res = await ctx.service.goods.delete(ctx.query)
    if (res.affectedRows === 1) {
      response(ctx, 200, '删除成功', {})
    } else {
      response(ctx, 612, '指定资源不存在或已被删除', {})
    }
  }

  public async update() {
    const ctx = this.ctx
    const res = await ctx.service.goods.update(ctx.request.body)
    if (res.affectedRows === 1) {
      response(ctx, 200, '保存成功', {})
    }
  }
}
export default GoodsController
