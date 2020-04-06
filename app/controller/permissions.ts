import { Controller } from 'egg'
import response from '../utils/response'
const createUpdateRule = {
  id: 'string',
  name: 'string',
  actionData: 'string',
  actionEntitySet: 'array',
  actions: 'array',
  actionList: 'array'
}
class PermissionController extends Controller {
  public async update() {
    const ctx = this.ctx
    ctx.validate(createUpdateRule)
    await ctx.service.permissions.update(ctx.request.body)
    response(ctx, 200, '新建/修改成功', ctx.request.body)
  }

  public async delete() {
    const ctx = this.ctx
    await ctx.service.permissions.delete(ctx.query.id)
    response(ctx, 200, '删除成功', {})
  }
}
export default PermissionController
