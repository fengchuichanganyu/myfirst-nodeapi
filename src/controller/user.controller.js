const { userRegisterError} = require('../constant/error.type')
const {createUser} = require('../service/user.service')

class UserController{
    async register(ctx,next){
        const { user_name, password,userid } = ctx.request.body
        try{
            const res = await createUser( user_name, password, userid)
            console.log(res)
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    userid: res.userid,
                  user_name: res.user_name,
                 
                },
              }

        }catch(err){
            console.log(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }
}

module.exports = new UserController()