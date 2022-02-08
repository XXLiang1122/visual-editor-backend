import path from 'path'
import Koa from 'koa'
import koaStatic from 'koa-static'
import koaBody from 'koa-body'
import cors from 'koa2-cors'
import mongoose from 'mongoose'
import initRouter from './routes'
import config from './config'
import handleErrorMiddleware from './middleware/handleError'

const app = new Koa()

// 错误处理中间件
app.use(handleErrorMiddleware)

// 初始化路由
initRouter(app)

// 配置静态web
app.use(koaStatic(path.resolve(__dirname, './public'), {
  gzip: true,
  setHeaders: (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
  }
}))

//跨域处理
app.use(cors())

// body接口数据处理
app.use(koaBody({
  multipart: true, // 支持文件上传
  // encoding: 'gzip',
  formidable: {
    // uploadDir: path.join(__dirname, './public/upload/'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 2000 * 1024 * 1024 // 文件上传大小
  }
}))

// 连接数据库
if(config.mongodb){
  mongoose.connect(config.mongodb.url, config.mongodb.options)
  .then(() => {
    console.log('mongoose connected...')
  })
  .catch(e => {
    console.error(e)
  })
}

app.listen(config.port || 3001)

console.log('listen 3001...')
