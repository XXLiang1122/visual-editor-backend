import userModel from '../model/user'

// 创建新用户
const createUser = async (name: string, password: string) => {
  if (!name || !password) return null
  await userModel.create({
    username: name,
    password
  })
  return getUserByUsername(name)
}

// 通过名字查找用户
const getUserByUsername = async (name: string) => {
  if (!name) return null
  const query = { username: { $in: name } }
  return userModel.findOne(query).exec()
}

// 通过名字查找用户密码
const getUserPasswordByUsername = async (name: string) => {
  if (!name) return null
  const query = { username: { $in: name } }
  return userModel.findOne(query).select('password').exec()
}

// 更改昵称
const updateName = async (id: string, name: string) => {
  await userModel.findByIdAndUpdate(id, { $set: { name } })
  return userModel.findOne({ _id: id }).exec()
}

// 更改头像
const updateAvatar = async (id: string, url: string) => {
  await userModel.findByIdAndUpdate(id, { $set: { avatar: url } })
  return userModel.findOne({ _id: id }).exec()
}

export {
  getUserByUsername,
  createUser,
  getUserPasswordByUsername,
  updateName,
  updateAvatar
}