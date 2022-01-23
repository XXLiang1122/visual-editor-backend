import { Context, Next } from 'koa'
import { returnBody } from '../extend/helper'
import { emptyTemplate } from '../extend/errorCode'
import { getTemplateById } from '../service/template'

// 模板权限中间件
export default async function (ctx: Context, next: Next) {
  const user = ctx.userData
  const { id } = ctx.params
  const template = await getTemplateById(id)
  // 判断模板存不存在、不是自己的模板也视为不存在
  if (!template || template.author !== user._id) {
    returnBody(ctx, {}, emptyTemplate.msg, emptyTemplate.code)
    return
  }

  await next()
}