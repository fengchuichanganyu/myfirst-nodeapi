const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

//创建模型（Model zd_user->zd_users）
const User = seq.define('mf_user',{
    userid:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        primaryKey:true,
        comment:'用户id,唯一'
    },
      user_name:{
        type: DataTypes.STRING,
        allowNull :false,
        comment :'用户名'
    },
    password:{
        type:DataTypes.CHAR(64),
        allowNull:false,
        comment:'密码'
    },
    
},
  
)

//强制同步数据库(创建数据表)
// User.sync({force:true})

module.exports = User