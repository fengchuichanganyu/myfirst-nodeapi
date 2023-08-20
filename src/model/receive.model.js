const { DataTypes} = require('sequelize')
const seq = require('../db/seq')
const Tasks = require('./tasks.model')

const Receives = seq.define('mf_receives',{
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

// Receives.sync({force:true})

Receives.belongsTo(Tasks,{
    foreignKey:'task_id',
    as:'tasks_info'
})

module.exports = Receives