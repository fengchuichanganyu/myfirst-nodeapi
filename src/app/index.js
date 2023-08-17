const path = require('path')

const Koa = require('koa')
const { koaBody}= require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')

const errHandler = require('./errorHandler')

const router = require('../router/index')


const app = new Koa()

app.use(koaBody({
    multipart:true,
    urlencoded: true, 
    formidable:{
        //在配置选项option里，不推荐使用相对路径
        //在option里的相对路径，不是相对的当前文件，相对process.cwd()
        uploadDir:path.join(__dirname,'../upload/'),
        keepExtensions:true,
    },
    parsedMethods:['POST','PUT','PATCH','DELETE']
}))
app.use(KoaStatic(path.join(__dirname,'../upload/')))
app.use(parameter(app))
app.use(router.routes())
app.use(router.allowedMethods())


app.on('error',errHandler)

module.exports = app