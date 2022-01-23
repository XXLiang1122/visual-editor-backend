import { Context, Next } from 'koa'
import { returnBody, checkToken } from '../extend/helper'
import { notLogin } from '../extend/errorCode'

// 验证登录中间件
export default async function (ctx: Context, next: Next) {
  const token = ctx.headers.token
  if (!token) {
    returnBody(ctx, {}, notLogin.msg, notLogin.code, 401)
    return
  }

  let user = null
  try {
    user = await checkToken(token.toString())
  } catch (e) {
    console.log(e)
  }

  if (!user) {
    returnBody(ctx, {}, notLogin.msg, notLogin.code, 401)
    return
  }

  ctx.userData = user
  await next()
}