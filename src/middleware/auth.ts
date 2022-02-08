import { Context, Next } from 'koa'
import { returnBody, checkToken } from '../extend/helper'
import { notLogin } from '../extend/errorCode'
import { getUserById } from '../service/user'

// 验证登录中间件
export default async function (ctx: Context, next: Next) {
  const token = ctx.headers.token
  if (!token) {
    returnBody(ctx, {}, notLogin.msg, notLogin.code)
    return
  }

  let payload = null
  try {
    payload = await checkToken(token.toString())
  } catch (e) {
    console.log(e)
  }

  if (!payload) {
    returnBody(ctx, {}, notLogin.msg, notLogin.code)
    return
  }

  // @ts-ignore
  const userInfo = await getUserById(payload.id as string)
  ctx.userData = userInfo

  await next()
}