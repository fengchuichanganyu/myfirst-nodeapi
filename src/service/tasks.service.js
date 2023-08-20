const Tasks = require('../model/tasks.model')

class TaskService{
    async createGoods(info){
        const res = await Tasks.create(info)
        return res.dataValues

    }

    async findTasksDetail(pageNum, pageSize){
        const offset = (pageNum -1) *pageSize
        const {count , rows } = await Tasks.findAndCountAll({ offset: offset, limit: pageSize * 1})

        return {
                pageNum,
                pageSize,
                total:count,
                list:rows,
            }
    }

    async findTasks(pageNum, pageSize){
        const offset = (pageNum - 1) * pageSize;
        const titles = await Tasks.findAll({
            attributes:['title'],
            offset,
            limit: pageSize * 1,
      })

      return titles 
    }

    async removeTasks(ctx,userid,task_id){
        const res = await Tasks.findOne({
            attributes:['userid'],
            where:{task_id}
        })
        // console.log(res.dataValues)
        const task = await Tasks.findOne({ where: { task_id } });

        if (task) {
            if (res.dataValues.userid === userid) {
                const del = await Tasks.destroy({ where: { task_id } });
                console.log(del);
                console.log('Task deleted successfully.');

                return del > 0 ? true : false;
            } else {
                console.error('不能取消别人发布的任务');
                return false;
            }
        } else {
            console.error('指定的id不存在');
            return false;
        }

    }

    async findMyPublishTasks(ctx,pageNum, pageSize){
        const userid = ctx.state.user.userid

        const { count,rows}= await Tasks.findAndCountAll({
            where:{userid},
            offset:(pageNum -1)*pageSize,
            limit:pageSize*1
            })
            console.log(count,rows)
        return {
            pageNum,
            pageSize,
            total:count,
            list:rows,
        }
    }

    async findOnGoingTasks(pageNum, pageSize){
        const offset = (pageNum -1) *pageSize
        const {count , rows } = await Tasks.findAndCountAll({
            where:{status:0},
             offset: offset,
              limit: pageSize * 1
            })

        return {
                pageNum,
                pageSize,
                total:count,
                list:rows,
            }
    }

    async findFinishedTasks(pageNum, pageSize){
        const offset = (pageNum -1) *pageSize
        const {count , rows } = await Tasks.findAndCountAll({
            where:{status:1},
             offset: offset,
              limit: pageSize * 1
            })

        return {
                pageNum,
                pageSize,
                total:count,
                list:rows,
            }
    }
}

module.exports = new TaskService()