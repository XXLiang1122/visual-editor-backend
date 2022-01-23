import { Context } from 'koa'
import {
  getUserByUsername,
  createUser,
  getUserPasswordByUsername,
  updateName as updateNameService,
  updateAvatar as updateAvatarService
} from '../service/user'
import {
  returnBody,
  createToken,
  createPassword,
  checkPassword
} from '../extend/helper'
import {
  emptyName,
  emptyPassword,
  shortPassword,
  longPassword,
  nameHasBeUsed,
  userNotExist,
  errorPassword
} from '../extend/errorCode'

// 注册
const register = async (ctx: Context) => {
  const { username, password } = ctx.request.body

  if (!username) {
    returnBody(ctx, {}, emptyName.msg, emptyName.code)
    return
  }
  if (!password) {
    returnBody(ctx, {}, emptyPassword.msg, emptyPassword.code)
    return
  }
  if (password.length < 6) {
    returnBody(ctx, {}, shortPassword.msg, shortPassword.code)
    return
  } else if (password.length > 16) {
    returnBody(ctx, {}, longPassword.msg, longPassword.code)
    return
  }

  const user = await getUserByUsername(username)
  // 检查用户是否已存在
  if (user) {
    returnBody(ctx, {}, nameHasBeUsed.msg, nameHasBeUsed.code)
    return
  }

  // 密码加密
  const pw = await createPassword(password)
  // 创建用户
  const userInfo = await createUser(username, pw)
  // 生成token
  const token = await createToken(userInfo.toObject())
  returnBody(ctx, { userInfo, token }, '注册成功')
}

// 登录
const login = async (ctx: Context) => {
  const { username, password } = ctx.request.body

  if (!username) {
    returnBody(ctx, {}, emptyName.msg, emptyName.code)
    return
  }
  if (!password) {
    returnBody(ctx, {}, emptyPassword.msg, emptyPassword.code)
    return
  }

  const user = await getUserByUsername(username)
  // 检查用户是否已存在
  if (!user) {
    returnBody(ctx, {}, userNotExist.msg, userNotExist.code)
    return
  }

  // 获取数据库用户密码
  const passwordStorage = await getUserPasswordByUsername(username)
  // 检查密码是否匹配
  const isPass = checkPassword(password, passwordStorage.password)
  if (!isPass) {
    returnBody(ctx, {}, errorPassword.msg, errorPassword.code)
    return
  }
  const token = await createToken(user.toObject())
  returnBody(ctx, { userInfo: user, token }, '登录成功')
}

// 更新昵称
const updateName = async (ctx: Context) => {
  const user = ctx.userData
  const { name } = ctx.request.body
  const newUser = await updateNameService(user._id, name)
  returnBody(ctx, newUser, '修改成功')
}

// 更新头像
const updateAvatar = async (ctx: Context) => {
  const user = ctx.userData
  const { url } = ctx.request.body
  const newUser = await updateAvatarService(user._id, url)
  returnBody(ctx, newUser, '修改成功')
}

export {
  register,
  login,
  updateName,
  updateAvatar
}