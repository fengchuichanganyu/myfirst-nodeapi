const bcrypt = require('bcryptjs')

const { getUserInfo} = require('../service/user.service')

const { userFormateError,
    userAlreadyExisted,
    userRegisterError,
} = require('../constant/error.type')

const userValidator = async (ctx,next)=>{
   
    const { user_name , password} = ctx.request.body
    if(!user_name || !password){
        console.error('用户名或者密码为空',ctx.request.body)
        ctx.app.emit('error',userFormateError,ctx)
        return 
    }
    await next()

}

const verifyUser = async (ctx,next)=>{
    const { userid} = ctx.request.body
    // console.log(userid)

    try{
        const res = await getUserInfo({ userid })
        console.log(res)

    if (res) {
      console.error('用户id已经存在', { userid })
      ctx.app.emit('error', userAlreadyExisted, ctx)
      return
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


module.exports = {
    userValidator,
    verifyUser,
    crpytPassword
}