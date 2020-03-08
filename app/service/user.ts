import { Service } from 'egg'
import { User, UserRole, UserPermission } from '../types'
import getToken from '../utils/getToken'
import transaction from '../utils/transaction'
import { processPermissions, processInfo, processRole } from '../utils/processService'

namespace UserServiceParams {
  export interface LoginBody {
    username: string
    password: string
    loginTypes: string
  }
}
export default class UserService extends Service {
  public async login(body: UserServiceParams.LoginBody): Promise<User> {
    const app = this.app as any
    const result = await app.mysql.beginTransactionScope(async conn => {
      const res: User = await conn.get('user', {
        user_name: body.username,
        user_password: body.password,
        role_id: body.loginTypes === '0' ? 'admin' : 'business'
      })
      if (res == null) return null
      const token = getToken({ user_id: res.user_id })
      const updateRes = await conn.query(
        'update user set user_token = ? where user_id = ?',
        [token, res.user_id]
      )
      if (updateRes.affectedRows !== 1) return null
      return {
        id: res.user_id,
        name: res.user_name,
        username: res.user_name,
        avatar: res.user_avatar,
        telephone: res.user_phone,
        createTime: res.user_createTime,
        roleId: res.role_id,
        lang: 'zh-CN',
        token
      }
    }, this.ctx)
    return result
  }

  public async getPermissionByRoleId(role_id: string) {
    return transaction(this, async conn => {
      return await conn.query('select * from permission where permission_id in (select permission_id from role_permission where role_id=?)', [role_id])
    })
  }

  public async info(user_id: string) {
    const app = this.app as any
    const result = await app.mysql.beginTransactionScope(async conn => {
      const res: User = await conn.get('user', {
        user_id
      })
      const role_id = res.role_id
      if (role_id) {
        const role: UserRole = await conn.get('role', { role_id })
        let permissions = await this.getPermissionByRoleId(role_id)
        permissions = processPermissions(permissions)
        return processInfo(res, role, permissions)
      }
    }, this.ctx)
    return result
  }

  public async role(role_id?: string) {
    const app = this.app as any
    const result = await app.mysql.beginTransactionScope(async conn => {
      const res: any = []
      const roles: UserRole[] = role_id ? await conn.select('role', { role_id }) : await conn.select('role')
      for (let i = 0; i < roles.length; i++) {
        const role = roles[i]
        let permissions = await this.getPermissionByRoleId(role.role_id)
        permissions = processPermissions(permissions)
        res.push(processRole(role, permissions))
      }
      return res
    }, this.ctx)
    return result
  }

  public async permissions(role_id: string) {
    const app = this.app as any
    const result = await app.mysql.beginTransactionScope(async conn => {
      const permissions: UserPermission[] = role_id ? await conn.select('permission', { role_id }) : await conn.select('permission')
      return permissions.map(permission => {
        const actionObj = JSON.parse(permission.permission_actions)
        return {
          id: permission.permission_id,
          name: permission.permission_name,
          status: permission.permission_status,
          actionData: permission.permission_actions,
          actionEntitySet: actionObj,
          actions: actionObj.map(e => e.action)
        }
      })
    }, this.ctx)
    return result
  }

  public async list() {
    const app = this.app as any
    const result = await app.mysql.beginTransactionScope(async conn => {
      const list: User[] = await conn.select('user')
      return list
    }, this.ctx)
    return result
  }
}
