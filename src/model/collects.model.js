const { DataTypes} = require('sequelize')
const seq = require('../db/seq')
const Tasks = require('./tasks.model')

const Collects = seq.define('mf_collects',{
    task_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'任务id'
    },
    userid:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户id'
    }
})

// Collects.sync({force:true})

Collects.belongsTo(Tasks,{
    foreignKey:'task_id',
    as:'tasks_info'
})

module.exports = Collects