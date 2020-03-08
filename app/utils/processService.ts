import { UserPermission, User, UserRole } from '../types';

export function processPermissions(permissions: UserPermission[]) {
  return permissions.map((item: UserPermission) => ({
    roleId: item.role_id,
    permissionId: item.permission_id,
    permissionName: item.permission_name,
    actions: item.permission_actions,
    actionEntitySet: JSON.parse(item.permission_actions)
  }))
}

export function processInfo(res: User, role: UserRole, permissions: any) {
  return {
    id: res.user_id,
    name: res.user_name,
    username: res.user_name,
    avatar: res.user_avatar,
    telephone: res.user_phone,
    createTime: res.user_createTime,
    business_id: res.business_id,
    roleId: res.role_id,
    role: {
      id: res.role_id,
      name: role.role_name,
      describe: role.role_describe,
      creatorId: role.role_creatorId,
      createTime: role.role_createTime,
      deleted: role.role_deleted,
      status: role.role_status,
      permissions
    }
  }
}

export function processRole(role: UserRole, permissions: any) {
  return {
    id: role.role_id,
    name: role.role_name,
    describe: role.role_describe,
    creatorId: role.role_creatorId,
    createTime: role.role_createTime,
    deleted: role.role_deleted,
    status: role.role_status,
    permissions,
    pageSize: 100,
    pageNo: 0,
    totalPage: 1,
    totalCount: 10
  }
}