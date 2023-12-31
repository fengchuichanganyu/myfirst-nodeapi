const Router = require('koa-router')

const {userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin,
} = require('../middleware/user.middleware')
const { register, login,changePassword} = require('../controller/user.controller')
const {auth} = require('../middleware/auth.middleware')

const router = new Router({ prefix:'/users'})

//注册用户
router.post('/register',userValidator,verifyUser,crpytPassword,register)

//登录
router.post('/login',userValidator , verifyLogin, login)

//修改密码
router.patch('/',auth,crpytPassword,changePassword)

module.exports =  router