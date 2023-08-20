const Router = require('koa-router')

const router = new Router({ prefix:'/tasks'})

const { auth} = require('../middleware/auth.middleware')
const { upload,
    create,
    findAllDetail,
    findAll,
    remove,
    findMyPublish,
    findOnGoing,
    findFinished
} = require('../controller/task.controller')

//上传图片发布任务
router.post('/upload', auth,upload, create)

//获取任务列表标题
router.get('/detail',auth,findAllDetail)

// 获取任务列表详情
router.get('/',auth,findAll)

//取消发布任务
router.delete('/:task_id',auth,remove)

//查询该用户发布的任务
router.get('/mypublish',auth,findMyPublish)

//查询正在进行的任务
router.get('/ongoing',auth,findOnGoing)

//查询已完成的任务
router.get('/finished',auth,findFinished)


module.exports = router