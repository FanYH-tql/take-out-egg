import { Controller } from 'egg'
import response from '../utils/response'

const createLoginRule = {
  username: { type: 'string' },
  password: { type: 'string' },
  loginTypes: { type: 'string' }
}

class UserController extends Controller {
  public async info() {
    const ctx = this.ctx
    ctx.session.user_id ||
      response(ctx, 401, '用户信息获取失败，请重新登录', {})
    const user = await ctx.service.user.info(ctx.session.user_id)

    user
      ? response(ctx, 200, '', user)
      : response(ctx, 401, '用户信息获取失败，请重新登录', {})
  }
  public async login() {
    const ctx = this.ctx
    ctx.validate(createLoginRule)
    const user = await ctx.service.user.login(ctx.request.body)
    user
      ? response(ctx, 200, '', user)
      : response(ctx, 401, '用户名或密码错误', {})
  }

  public async role() {
    const ctx = this.ctx
    const roles = await ctx.service.user.role(ctx.query.role_id || '')
    response(ctx, 200, '', {
      data: roles
    })
  }

  public async permissions() {
    const ctx = this.ctx
    const permissions = await ctx.service.user.permissions(ctx.query.role_id || '')
    response(ctx, 200, '', {
      data: permissions
    })
  }

  public async list() {
    const ctx = this.ctx
    const list = await ctx.service.user.list()
    response(ctx, 200, '', {
      data: list
    })
  }

  public async delete() {
    const ctx = this.ctx
    await ctx.service.user.delete(ctx.query)
    response(ctx, 200, '删除成功', {})
  }

  public async update() {
    const ctx = this.ctx
    delete ctx.request.body.permissions
    await ctx.service.user.update(ctx.request.body)
    response(ctx, 200, '修改成功', {})
  }
}
export default UserController
