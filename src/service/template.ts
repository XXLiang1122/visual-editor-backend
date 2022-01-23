import templateModel from '../model/template'

// 新建模板
const create = async (userId: string) => {
  return await templateModel.create({
    author: userId
  })
}

// 删除模板
const remove = async (id: string) => {
  return await templateModel.findByIdAndRemove(id)
}

// 根据id获取模板详情
const getTemplateById = async (id: string) => {
  return await templateModel.findById(id).exec()
}

// 获取我的模板列表
const getMyTemplates = async (userId: string, page: number, pageSize: number) => {
  const query = { author: userId }
  return await templateModel.find(query).skip(pageSize * (page - 1)).limit(pageSize).sort({ updatedAt: -1 }).select('_id title desc coverUrl').exec()
}

// 更新模板内容
const updateTemplate = async (id: string, template: any) => {
  await templateModel.findByIdAndUpdate(id, { $set: { template } })
  return getTemplateById(id)
}

// 更新模板标题和描述
const updateTitleAndDesc = async (id: string, title: string, desc: string) => {
  await templateModel.findByIdAndUpdate(id, { $set: { title, desc } })
  return getTemplateById(id)
}

export {
  create,
  remove,
  getTemplateById,
  getMyTemplates,
  updateTemplate,
  updateTitleAndDesc
}