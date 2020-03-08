export default (ctx, code: number, message: string, result: any) => {
  ctx.status = +code
  console.log('ctx.status', ctx.status)
  ctx.body = {
    code,
    message,
    result: Array.isArray(result) ? [ ...result ] : {
      ...result
    }
  }
} 