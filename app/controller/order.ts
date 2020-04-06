import { Controller } from 'egg'
import response from '../utils/response'

class OrderController extends Controller {
  public async create() {
    const ctx = this.ctx
    const res = await ctx.service.order.create(ctx.request.body)
    response(ctx, 200, '', res[0])
  }

  public async list() {
    const ctx = this.ctx
    const res = await ctx.service.order.list(ctx.query)
    response(ctx, 200, '', res)
  }

  public async pay() {
    const ctx = this.ctx
    await ctx.service.order.pay(ctx.query.id)
    response(ctx, 200, '', {})
  }

  public async delete() {
    const ctx = this.ctx
    await ctx.service.order.delete(ctx.query.id)
    response(ctx, 200, '', {})
  }
}
export default OrderController
