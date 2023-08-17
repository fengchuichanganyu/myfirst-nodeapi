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
}

module.exports = new TaskService()