const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

const { userRegisterError,userLoginError} = require('../constant/error.type')
const {createUser,getUserInfo} = require('../service/user.service')

class UserController{
    async register(ctx,next){
        const { user_number, password,userid,user_point } = ctx.request.body
        try{
            const res = await createUser( user_number, password, userid,user_point)
            // console.log(res)
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    userid: res.userid,
                    user_number: res.user_number,
                    user_point:res.user_point,
                 
                },
              }

        }catch(err){
            console.log(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }

    async login(ctx,next){
        
        const { userid} = ctx.request.body

        try{
            const {password,...res} = await getUserInfo({userid})

            ctx.body = {
                code:'0',
                message:'用户登录成功',
                result:{
                  token:jwt.sign(res,JWT_SECRET,{expiresIn:'1d'})
                },
            }
        }catch(err){
            console.error('用户登录失败',err)
            return ctx.app.emit('error',userLoginError,ctx)
        }
    
    }
}

module.exports = new UserController()