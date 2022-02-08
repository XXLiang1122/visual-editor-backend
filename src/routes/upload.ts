import Router from 'koa-router'
import fs from 'fs'
import path from 'path'
import { returnBody } from '../extend/helper'

const router = new Router()

router.post('/upload', async(ctx, next) => {
  // 上传的文件在ctx.request.files.file
	const file = ctx.request?.files?.file
  if (file) {
    // 创建可读流
    // @ts-ignore
    const reader = fs.createReadStream(file.path)
    // 获取文件路径
    const dirName = new Date().toLocaleDateString().replace(/\//g, '_')
    const dir = path.join(__dirname, `../public/upload/${dirName}`)
    // 检查文件夹是否存在如果不存在则新建文件夹
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    // @ts-ignore
    var targetPath = path.join(dir, file.name)
    // 创建可写流
    const upStream = fs.createWriteStream(targetPath)
    // 可读流通过管道写入可写流
    reader.pipe(upStream)
    //返回保存的路径
    // @ts-ignore
    returnBody(ctx, { url: 'http://' + ctx.headers.host + '/upload/' + dirName + '/' + file.name }, '上传成功')
  }
})

export default router