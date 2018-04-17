/**
 * 整合所有子路由
 */
let prefix = ''

module.exports = app => {
  app.use(prefix + '/user', require('./user'))
  app.use(prefix + '/utils', require('./utils'))
}
