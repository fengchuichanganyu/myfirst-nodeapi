const { Sequelize } = require('sequelize')

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  define: {
    charset: 'utf8', // 设置字符集为 UTF-8
    collate: 'utf8_general_ci', // 设置排序规则为 UTF-8
  },
})


seq
  .authenticate()
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.log('数据库连接失败', err)
  })

module.exports = seq