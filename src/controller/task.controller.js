const path = require('path')
const fs = require('fs').promises

const { unSupportedFileType,
    fileUploadError,
    publishGoodsError,
    invalidTasksId,
} = require('../constant/error.type')

const { createGoods, 
    findTasksDetail,
    findTasks ,
    removeTasks,
    findMyPublishTasks,
} = require('../service/tasks.service')

class TaskController{
     async upload(ctx,next){
        
        const {file} = ctx.request.files
        // console.log(ctx.request.files)
        const fileTypes = ['image/jpeg','image/png','image/jpg']

        if(file){
            if(!fileTypes.includes(file.mimetype)){
                return ctx.app.emit('error',unSupportedFileType,ctx)
            }
            ctx.body = {
                code:0,
                message:'商品图片上传成功',
                result:{
                    goods_img:path.basename(file.filepath),
                },
            }

        }else {
            return ctx.app.emit('error',fileUploadError,ctx)
        }

        await next()
     }

     async create(ctx,next){
        try{
            const userid = ctx.state.user.userid
            const { file ,title} = ctx.request.files

            const  info=JSON.parse( await fs.readFile(title.filepath, 'utf8'))
            info.filePath = path.basename(file.filepath)
            info.userid = userid
             console.log(info)
            const {createdAt,updatedAt,...res} = await createGoods(info)
            ctx.body = {
                code:0,
                message:'发布任务成功',
                result:res,
            }
    
          } catch(err){
            console.error(err)
            return ctx.app.emit('error',publishGoodsError,ctx)
          }
     }

     async findAllDetail(ctx,next){
         //1.解析pagenum和pageSize
        const { pageNum = 1, pageSize = 10} = ctx.request.query
        //2.调用数据处理的相关方法
        const res =  await findTasksDetail(pageNum, pageSize)
        //3.返回结果
        ctx.body =res
     }

     async findAll(ctx,next){
        //1.解析pagenum和pageSize
       const { pageNum = 1, pageSize = 10} = ctx.request.query
       //2.调用数据处理的相关方法
       const res =  await findTasks(pageNum, pageSize)
       //3.返回结果
       ctx.body =res
    }

    async remove(ctx,next){
        // console.log(ctx.request.params.taskid)
        const res =  await removeTasks(ctx,ctx.state.user.userid,ctx.request.params.taskid)
// console.log(res)
       if(res){
        ctx.body = {
            code:'0',
            message:'取消发布任务成功',
            result:'',
        }
          }else{
            return ctx.app.emit('error',invalidTasksId,ctx)
          }
    }

    async findMyPublish(ctx,next){
        //1.解析pagenum和pageSize
       const { pageNum = 1, pageSize = 10} = ctx.request.query
       //2.调用数据处理的相关方法
       const res =  await findMyPublishTasks(ctx,pageNum, pageSize)
       //3.返回结果
       ctx.body =res
    }
}

module.exports = new TaskController()