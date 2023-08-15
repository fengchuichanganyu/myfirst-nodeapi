const Koa = require('koa')
const { koaBody}= require('koa-body')

const errHandler = require('./errorHandler')

const router = require('../router/index')


const app = new Koa()

app.use(koaBody())
app.use(router.routes())

app.on('error',errHandler)

module.exports = app