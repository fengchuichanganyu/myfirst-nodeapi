const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

const { invalidToken,tokenExpiredError} = require('../constant/error.type')

const auth =  async (ctx,next)=>{
    const { authorization = ''} = ctx.request.header
    const token = authorization.replace('Bearer ','')
    // console.log(token)
    try{
        //user中包含playload的信息（id，user_name,is_admin）
        // console.log(JWT_SECRET)

        const user = jwt.verify(token,JWT_SECRET)
        
         ctx.state.user = user

    }catch(err){
        // console.log(JWT_SECRET)
        // console.log(JWT_SECRET)
console.log(err.name)
        switch(err.name){
            case'TokenExpiredError':
            console.error('token已过期',err)
            return ctx.app.emit('error',tokenExpiredError,ctx)
            case'JsonWebTokenError':
            console.error('token无效',err)
            return ctx.app.emit('error',invalidToken,ctx)

        }
        // console.log(JWT_SECRET)

    }
    // console.log(token)

    await next()

}

module.exports = {
    auth
}