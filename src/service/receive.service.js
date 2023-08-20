const Receives = require('../model/receive.model')
const Tasks = require('../model/tasks.model')

class ReceiveService{
    async created(userid,task_id){
        return await Receives.create({
            userid,
            task_id
         })
    }

    async findReceives(ctx,pageNum ,pageSize){
        const userid = ctx.state.user.userid

        const offset = (pageNum - 1) *pageSize
       const {count , rows} =  await Receives.findAndCountAll({
            attributes:['userid'],
            where:{userid},
            offset:offset,
            limit:pageSize *1,
            include:{
                model:Tasks,
                as:'tasks_info',
                attributes:['status','userid','title','deadline','salary','location','filePath']
            }
        })
        return {
            pageNum,
            pageSize,
            total:count,
            list:rows,
        }
    }

    async removeReceive(task_id,userid){
        return Receives.destroy({
            where:{task_id:task_id,userid:userid},
        })

    }
}

module.exports = new ReceiveService()