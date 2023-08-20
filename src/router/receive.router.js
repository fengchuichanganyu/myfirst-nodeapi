const Router = require('koa-router')

const { auth} = require('../middleware/auth.middleware')
const { validator,receives_validator } = require('../middleware/receive,middleware')

const  { add,findAll ,remove} = require('../controller/receive.controller')

const router = new Router({prefix:'/receive'})

//添加到接单
router.post('/',auth,validator({id:'number'}),receives_validator,add )

router.get('/',auth,findAll)

router.delete('/',auth,remove)


module.exports = router