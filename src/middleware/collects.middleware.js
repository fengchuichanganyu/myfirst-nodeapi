const Tasks = require('../model/tasks.model')

const { collectFormatError,
    invalidTasksId
} = require('../constant/error.type')

const validator = (rules)=>{
    return async (ctx,next)=>{
        try{
            console.log(rules)
            ctx.verifyParams(rules)
        }catch(err){
            console.error(err)
           
            collectFormatError.result = err
            return ctx.app.emit('error',collectFormatError,ctx)
        }
        await next()
    }
}

const collects_validator =  async (ctx,next)=>{
    const whereOpt = ctx.request.body.id
    // console.log(whereOpt)
    const res = await Tasks.findOne({       
        where:{id:whereOpt},      
      })
    // console.log(res)
    if(!res){   
        return ctx.app.emit('error',invalidTasksId,ctx)
    }
    await next()

}

module.exports = {
    validator,
    collects_validator
}