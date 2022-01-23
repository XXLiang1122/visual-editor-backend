import Router from 'koa-router'
import { register, login, updateName, updateAvatar } from '../controllers/user'
import authMiddleware from '../middleware/auth'

const router = new Router()

// 注册
router.post('/user/register', register)
// 登录
router.post('/user/login', login)
// 改昵称
router.put('/user/update/name', authMiddleware, updateName)
// 改头像
router.put('/user/update/avatar', authMiddleware, updateAvatar)

export default router