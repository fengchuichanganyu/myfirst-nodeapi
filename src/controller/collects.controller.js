const { created ,findCollects} = require('../service/collects.service')

class CollectController{
    async add(ctx){
        const userid = ctx.state.user.userid
        const task_id = ctx.request.body.id
        console.log(userid,task_id)
     const res =  await created(userid,task_id)
     ctx.body = {
         code:'0',
         message:'添加到收藏成功',
         result:res,
     }
 }
 
    async findAll(ctx){
        
        const {pageNum = 1 ,pageSize = 10} = ctx.request.query
        const res = await findCollects(ctx,pageNum ,pageSize)
    
        ctx.body  ={
            code:'0',
            message:'获取收藏列表成功',
            result:res,
        }
    }
}

module.exports = new CollectController()