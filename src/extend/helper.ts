import fs from 'fs'
import { Context } from 'koa'
import path from 'path'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import config from '../config'

// 读取文件夹下的文件并加载
function scanFoldersFiles<T> (dir: string, cb: (a: string, b: T) => void) {
  try {
    const folder = path.resolve(__dirname, dir)
    const files = fs.readdirSync(folder)
    files
    .filter(file => (file.endsWith('.ts') || file.endsWith('.js')) && (file !== 'index.ts' && file !== 'index.js'))
    .forEach(async file => {
      const filename = file.replace(/\.ts|\.js/, '')
      const fileFn = await import(folder + '/' + filename)
      cb && cb(filename, fileFn.default)
    })
  } catch (e) {
    console.log(e)
  }
}

// 返回客户端内容
function returnBody (ctx: Context, data: Object, msg: string = '', code: number = 0, status: number = 200) {
  ctx.status = status
  ctx.body = {
    data,
    msg,
    code
  }
}

// 加密密码
function createPassword (password: string) {
  const md5 = crypto.createHash('sha256')
  return md5.update(password.toString() + config.crypto.secret).digest('hex') // 把输出编程16进制的格式
}

// 检查密码
function checkPassword (unEncryptedPW: string, pw: string) {
  const password = createPassword(unEncryptedPW)
  return password === pw
}

// 生成token
async function createToken (id: string) {
  return await jwt.sign({id}, config.jwt.secret, {expiresIn: 30 * 24 * 60 * 60 + 's'})
}

// 验证token
async function checkToken (token: string) {
  return await jwt.verify(token, config.jwt.secret)
}

export {
  scanFoldersFiles,
  returnBody,
  createToken,
  checkToken,
  createPassword,
  checkPassword
}