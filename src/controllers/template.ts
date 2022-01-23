import { Context } from 'koa'
import {
  create,
  remove,
  getTemplateById,
  getMyTemplates as getMyTemplatesService,
  updateTemplate as updateTemplateService,
  updateTitleAndDesc
} from '../service/template'
import { returnBody } from '../extend/helper'
import { removeTemplateFailed } from '../extend/errorCode'

// 新建模板
const createTemplate = async (ctx: Context) => {
  const user = ctx.userData
  const newTemplate = await create(user._id)
  returnBody(ctx, newTemplate, '创建成功')
}

// 删除模板
const removeTemplate = async (ctx: Context) => {
  const { id } = ctx.params

  try {
    await remove(id)
  } catch (e) {
    returnBody(ctx, {}, removeTemplateFailed.msg, removeTemplateFailed.code)
    return
  }

  returnBody(ctx, {}, '删除成功')
}

// 获取模板详情
const getMyTemplate = async (ctx: Context) => {
  const { id } = ctx.params
  const template = await getTemplateById(id)

  returnBody(ctx, template)
}

// 获取我的模板列表
const getMyTemplates = async (ctx: Context) => {
  let { page, pageSize } = ctx.request.query

  if (Number(page) < 1) {
    returnBody(ctx, [])
    return
  }
  if (Number(pageSize) < 1) {
    returnBody(ctx, [])
    return
  } else if (Number(pageSize) > 20) {
    pageSize = '20'
  }

  const user = ctx.userData
  const templates = await getMyTemplatesService(user._id, Number(page), Number(pageSize))
  returnBody(ctx, templates)
}

// 更新模板内容
const updateTemplate = async (ctx: Context) => {
  const { id } = ctx.params
  const { template: templateDetail } = ctx.request.body

  const tpl = await updateTemplateService(id, templateDetail)
  returnBody(ctx, tpl, '修改成功')
}

// 更新模板标题和描述
const updateTemplateTitleAndDesc = async (ctx: Context) => {
  const { id } = ctx.params
  const { title, desc } = ctx.request.body

  const tpl = await updateTitleAndDesc(id, title, desc)
  returnBody(ctx, tpl, '修改成功')
}

export {
  createTemplate,
  removeTemplate,
  getMyTemplate,
  getMyTemplates,
  updateTemplate,
  updateTemplateTitleAndDesc
}