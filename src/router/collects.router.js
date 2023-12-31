const Router = require('koa-router')

const { auth} = require('../middleware/auth.middleware')
const { validator, collects_validator} = require('../middleware/collects.middleware')

const { add, findAll,remove} = require('../controller/collects.controller')

const router = new Router({prefix:'/collect'})

router.post('/upload',auth ,validator({id:'number'}),collects_validator ,add)

router.get('/',auth,findAll)

router.delete('/',auth,remove)

module.exports = router