import { Controller } from 'egg'
import response from '../utils/response'
const createUpdateRule = {
  id: 'string',
  name: 'string',
  status: 'number',
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
    response(ctx, 200, '修改成功', ctx.request.body)
  }
}
export default PermissionController
