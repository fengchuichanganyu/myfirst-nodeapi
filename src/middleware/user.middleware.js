const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

const { login} = require('../controller/user.controller')



const { getUserInfo} = require('../service/user.service')

const { userFormateError,
    userAlreadyExisted,
    userRegisterError,
    useridDoesNotExist,
    wrongPassword,
    userLoginError,
} = require('../constant/error.type')

const userValidator = async (ctx,next)=>{
   
    const { user_number , password, userid} = ctx.request.body
    if(!user_number || !password ||!userid){
        console.error('学号或者密码或用户id为空',ctx.request.body)
        ctx.app.emit('error',userFormateError,ctx)
        return 
    }
    await next()

}

const verifyUser = async (ctx,next)=>{
    const { userid} = ctx.request.body

    try{
        const res = await getUserInfo({ userid })
        // console.log(res)

    if (res) {
    //   console.error('用户id已经存在', { userid })
    //   ctx.app.emit('error', userAlreadyExisted, ctx)
    //   return
    const {userid, password } = ctx.request.body


    try{
        const res = await getUserInfo({ userid})
        console.log(res)

console.log(password,res.password)
        if(! bcrypt.compareSync(password, res.password)){
            console.error('密码错误',{password})
            ctx.app.emit('error',wrongPassword,ctx)
            return 
        }
    }catch(err){
        console.error('用户登录失败',err)
        return ctx.app.emit('error',userLoginError,ctx)
    }


    try{
        const {password,...loginres} = res
        ctx.body = {
            code:'0',
            message:'用户登录成功',
            result:{
              token:jwt.sign(loginres,JWT_SECRET,{expiresIn:'1d'})
            },
        }
        return
    }catch(err){
        console.error('用户登录失败',err)
        return ctx.app.emit('error',userLoginError,ctx)
    }

    }
    }catch(err){
        console.error('获取用户信息错误', err)
    ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next()
}

const crpytPassword = async (ctx,next)=>{
    const {password} = ctx.request.body


    const salt = bcrypt.genSaltSync(10);
    //hash保存的是密文
    const hash = bcrypt.hashSync(password,salt)

    ctx.request.body.password = hash

    await next()
}

const verifyLogin = async (ctx,next)=>{
    const { userid , password } = ctx.request.body

    try{
        const res = await getUserInfo({ userid})
        // console.log(res)

        if(!res){
            console.error('用户id不存在',{userid})
            ctx.app.emit('error',useridDoesNotExist,ctx)
            return
        }
// console.log(password,res.password)
        if(! bcrypt.compareSync(password, res.password)){
            console.error('密码错误',{password})
            ctx.app.emit('error',wrongPassword,ctx)
            return 
        }
    }catch(err){
        console.error(err)
        return ctx.app.emit('error',userLoginError,ctx)
    }
    await next()
}


module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin
}