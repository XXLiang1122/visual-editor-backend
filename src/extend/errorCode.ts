const notLogin = {
  code: 100,
  msg: '未登录'
}

const emptyName = {
  code: 101,
  msg: '用户名不能为空'
}

const emptyPassword = {
  code: 102,
  msg: '密码不能为空'
}

const shortPassword = {
  code: 103,
  msg: '密码长度不能少于6位'
}

const longPassword = {
  code: 104,
  msg: '密码长度不能超过16位'
}

const nameHasBeUsed = {
  code: 105,
  msg: '用户名已被使用'
}

const userNotExist = {
  code: 106,
  msg: '用户不存在'
}

const errorPassword = {
  code: 107,
  msg: '密码错误'
}

const removeTemplateFailed = {
  code: 201,
  msg: '删除失败'
}

const notMyTemplate = {
  code: 202,
  msg: '不能删除/修改不属于自己的模板'
}

const emptyTemplate = {
  code: 203,
  msg: '模板不存在'
}

export {
  emptyName,
  emptyPassword,
  shortPassword,
  longPassword,
  nameHasBeUsed,
  userNotExist,
  errorPassword,
  notLogin,
  removeTemplateFailed,
  notMyTemplate,
  emptyTemplate
}