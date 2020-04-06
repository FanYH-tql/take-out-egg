import { Controller } from 'egg'
import response from '../utils/response'

const createCreateRule = {
  address: 'string',
  latitude: 'number',
  longitude: 'number',
  name: 'string',
  phone: 'string',
  detail: 'string',
  default: 'boolean',
  openid: 'string',
}
class AddressController extends Controller {
  public async create() {
    const ctx = this.ctx
    ctx.validate(createCreateRule)
    const res = await ctx.service.address.create(ctx.request.body)
    if (res.affectedRows === 1) {
      response(ctx, 200, '', ctx.request.body)
    }
  }

  public async list() {
    const ctx = this.ctx
    const res = await ctx.service.address.list(ctx.query.openid || '')
    response(ctx, 200, '', res)
  }

  public async delete() {
    const ctx = this.ctx
    const res = await ctx.service.address.delete(ctx.query.id)
    if (res.affectedRows === 1) {
      response(ctx, 200, '', {})
    }
  }

  public async update() {
    const ctx = this.ctx
    const res = await ctx.service.address.update(ctx.request.body)
    if (res.affectedRows === 1) {
      response(ctx, 200, '', {})
    }
  }

  public async setDefault() {
    const ctx = this.ctx
    const res = await ctx.service.address.setDefault(ctx.query)
    response(ctx, 200, '', res)
  }
}
export default AddressController
