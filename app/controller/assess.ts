import { Controller } from 'egg'
import response from '../utils/response'

class AssessController extends Controller {
  public async create() {
    const ctx = this.ctx
    const res = await ctx.service.assess.create(ctx.request.body)
    response(ctx, 200, '', res)
  }

  public async list() {
    const ctx = this.ctx
    const res = await ctx.service.assess.list(ctx.query.id)
    response(ctx, 200, '', res)
  }

  public async reply() {
    const ctx = this.ctx
    await ctx.service.assess.reply(ctx.request.body)
    response(ctx, 200, '回复成功', {})
  }

  public async delete() {
    const ctx = this.ctx
    await ctx.service.assess.delete(ctx.query.id)
    response(ctx, 200, '删除成功', {})
  }
}
export default AssessController
