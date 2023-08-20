const { created,findReceives ,removeReceive} = require('../service/receive.service')

class ReceiveController{
    async add(ctx){
        const userid = ctx.state.user.userid
        const task_id = ctx.request.body.id
        console.log(userid,task_id)
     const res =  await created(userid,task_id)
     ctx.body = {
         code:'0',
         message:'添加到接单成功',
         result:res,
     }
 }

    async findAll(ctx){
            
        const {pageNum = 1 ,pageSize = 10} = ctx.request.query
        const res = await findReceives(ctx,pageNum ,pageSize)

        ctx.body  ={
            code:'0',
            message:'获取接单列表成功',
            result:res,
        }
    }

    async remove(ctx){
        const {task_id} = ctx.request.body
        const userid = ctx.state.user.userid

        const res = await removeReceive(task_id,userid)
        if(res ==0){
            ctx.body = {
                code:'0',
                message:'接单中无此任务',
                result:res,
            }  
        }else{
            ctx.body = {
                code:'0',
                message:'删除任务成功',
                result:res,
            }
        }    
    }
}

module.exports = new ReceiveController()