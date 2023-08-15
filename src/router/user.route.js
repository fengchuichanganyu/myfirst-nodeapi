const Router = require('koa-router')

const {userValidator,verifyUser,crpytPassword} = require('../middleware/user.middleware')
const { register} = require('../controller/user.controller')

const router = new Router({ prefix:'/users'})

//注册用户
router.post('/register',userValidator,verifyUser,crpytPassword,register)

module.exports =  router