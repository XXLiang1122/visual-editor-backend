import Router from 'koa-router'
import {
  createTemplate,
  removeTemplate,
  getMyTemplate,
  getMyTemplates,
  updateTemplate,
  updateTemplateTitleAndDesc
} from '../controllers/template'
import authMiddleware from '../middleware/auth'
import templateAuthMiddleware from '../middleware/templateAuth'

const router = new Router()

// 创建模板
router.post('/template/create', authMiddleware, createTemplate)
// 获取我的模板列表
router.get('/template/list', authMiddleware, getMyTemplates)
// 获取模板详情
router.get('/template/detail/:id', authMiddleware, templateAuthMiddleware, getMyTemplate)
// 删除模板
router.delete('/template/remove/:id', authMiddleware, templateAuthMiddleware, removeTemplate)
// 更新模板内容
router.put('/template/update/:id', authMiddleware, templateAuthMiddleware, updateTemplate)
// 修改模板标题和描述
router.put('/template/update/titleAndDesc/:id', authMiddleware, templateAuthMiddleware, updateTemplateTitleAndDesc)

export default router