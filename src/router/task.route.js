const Router = require('koa-router')

const router = new Router({ prefix:'/tasks'})

const { auth} = require('../middleware/auth.middleware')
const { upload,create,findAllDetail,findAll} = require('../controller/task.controller')

//上传图片发布任务
router.post('/upload', auth,upload, create)

//获取任务列表标题
router.get('/detail',auth,findAllDetail)

// 获取任务列表详情
router.get('/',auth,findAll)

module.exports = router