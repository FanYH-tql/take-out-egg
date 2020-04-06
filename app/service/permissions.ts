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
    return transaction(this, async conn => {
      const res = await conn.get('permission', {
        permission_id: body.id
      })
      if (res) {
        await conn.update('permission', {
          permission_name: body.name,
          permission_actions: body.actionData
        }, {
          where: {
            permission_id: body.id
          }
        })
      } else {
        await conn.insert('permission', {
          permission_name: body.name,
          permission_actions: body.actionData,
          permission_id: body.id
        })
      }
    })
  }

  public async delete(id: string) {
    return transaction(this, async conn => {
      await conn.delete('permission', {
        permission_id: id
      })
    })
  }
}
