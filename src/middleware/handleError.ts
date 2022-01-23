import { Context, Next } from 'koa'
import { returnBody } from '../extend/helper'

// 错误处理中间件
export default async function (ctx: Context, next: Next) {
  try {
    await next()
  } catch (e: any) {
    console.log(e)
    const code = e.status || 500
    // 如果时生产环境的时候 500错误的详细错误内容不返回给客户端
    const msg = code === 500 ? '网络错误' : e.message

    returnBody(ctx, {}, msg, code)
  }
}