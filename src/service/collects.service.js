const Collects = require('../model/collects.model')
const Tasks = require('../model/tasks.model')

class CollectService{
    async created(userid,task_id){
        return await Collects.create({
            userid,
            task_id
         })
    }
       
    async findCollects(ctx,pageNum ,pageSize){
        const userid = ctx.state.user.userid

        const offset = (pageNum - 1) *pageSize
       const {count , rows} =  await Collects.findAndCountAll({
            attributes:['userid'],
            where:{userid},
            offset:offset,
            limit:pageSize *1,
            include:{
                model:Tasks,
                as:'tasks_info',
                attributes:['userid','title','deadline','salary','location','filePath']
            }
        })
        return {
            pageNum,
            pageSize,
            total:count,
            list:rows,
        }
    }
      
}

module.exports = new CollectService()