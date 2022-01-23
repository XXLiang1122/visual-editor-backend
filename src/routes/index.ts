import Koa from 'koa'
import Router from 'koa-router'
import { scanFoldersFiles } from '../extend/helper'

export default (app: Koa) => {
  scanFoldersFiles<Router>('../routes', (filename, route) => {
    app.use(route.routes())
  })
}