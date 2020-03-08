export default async (obj: any, cb: any) => {
  const result = await obj.app.mysql.beginTransactionScope(async (conn: any) => {
    return cb(conn)
  }, obj.ctx)  
  return result
}