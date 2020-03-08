import { Service } from 'egg'
import transaction from '../utils/transaction'
namespace PermissionParams {
  export interface UpdateBody {
    id: string
    name: string
    actionData: string
    status: number
  }
}
export default class PermissionService extends Service {
  public async update(body: PermissionParams.UpdateBody) {
    return transaction(this, conn => {
      conn.update('permission', {
        permission_name: body.name,
        permission_actions: body.actionData
      }, {
        where: {
          permission_id: body.id
        }
      })
      return true
    })
  }
}
