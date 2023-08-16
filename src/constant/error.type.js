module.exports = {
    userFormateError:{
        code:'10001',
        message:'用户名或者密码或用户id为空',
        result:'',
    },
    userAlreadyExisted:{
        code:'10002',
        message:'用户id已经存在',
        result:'',
    },
    userRegisterError: {
        code: '10003',
        message: '用户注册失败',
        result: '',
      },
      useridDoesNotExist:{
        code:'10004',
        message:'用户id不存在',
        result:'',
      },
      wrongPassword:{
        code:'10006',
        message:'密码错误',
        result:'',
      },
      userLoginError:{
        code:'10005',
        message:'用户登陆出错',
        result:'',
      },
      tokenExpiredError:{
        code:'10101',
        message:'token已过期',
        result:'',
      },
      invalidToken:{
        code:'10102',
        message:'无效的token',
        result:'',
      },
      changePasswordError:{
        code:'10007',
        message:'先密码不能与原密码一致',
        result:'',
      },

}
