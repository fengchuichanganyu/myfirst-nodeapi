const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Tasks = seq.define('mf_tasks', {
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '0,任务状态:0:正在进行.1:已完成',
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '发布者id',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '任务标题',
  },
  deadline: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '截止时间',
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '酬薪',
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '位置',
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '任务图片',
  },
},
)

// Tasks.sync({ force: true })

module.exports = Tasks