interface User {
  user_id: number
  user_name: string
  user_password: string
  user_email: string
  user_avatar: string
  user_createTime: string
  user_phone: string
  user_latitude
  user_longitude: string
  role_id: string
  business_id: number
}
interface UserRole {
  role_id: string
  role_name: string
  role_describe: string
  role_deleted: number
  role_creatorId: string
  role_createTime: string
  role_status: number
}

interface UserPermission {
  role_id: string
  permission_id: string
  permission_name: string
  permission_actions: string
  permission_status: number
}
export {
  User,
  UserRole,
  UserPermission
}