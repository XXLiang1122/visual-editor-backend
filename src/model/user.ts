import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserModel = mongoose.model('user', new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: '用户9527'
  },
  avatar: {
    type: String,
    default: 'http://localhost:3001/upload/2022_2_8/avatar.jpeg'
  },
}))

export default UserModel