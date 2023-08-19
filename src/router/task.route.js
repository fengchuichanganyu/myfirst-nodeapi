const Router = require('koa-router')

const router = new Router({ prefix:'/tasks'})

const { auth} = require('../middleware/auth.middleware')
const { upload,
    create,
    findAllDetail,
    findAll,
    remove,
    findMyPublish
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

module.exports = router