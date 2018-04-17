const dbUtils = require('../utils/db-util.js')

let table = {
  user: 'account',
  characters: 'characters',
  authority: 'authority'
}
const user = {
  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create(model) {
    let result = await dbUtils.insertData(table.user, model)
    return result
  },

  /**
   * 根据用户名和密码查找用户
   * @param  {String} username 用户名密码对象
   * @param  {String} password 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword(username, password) {
    let _sql = `
    SELECT * from ${table.user}
      where password="${password}" and username="${username}"
      limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options) {
    let _sql = `
    SELECT * from user_info
      where email="${options.email}" or name="${options.name}"
      limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名查找用户信息
   * @param  {string} userName 用户账号名称
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName(userName) {
    let result = await dbUtils.select(table.user, [
      'id',
      'username',
      'insert_time',
      'tb_status'
    ])
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  async showAllUser() {
    let result = await dbUtils.select(table.user)
    console.log(result)
    if (Array.isArray(result) && result.length > 0) {
      return result
    } else {
      return null
    }
  },

  /**
   * 根据id查找用户权限
   * @param  {ini} id
   * @return {object|null}     查找结果
   */
  async getCharactersById(id) {
    let result = await dbUtils.select(table.characters, [
      'authorityIds',
      'name'
    ])
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据id查找前端路由
   * @param  {ini} id
   * @return {object|null}     查找结果
   */
  async getAuthorityById(id) {
    let result = await dbUtils.findDataById(table.authority, id)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }
}

module.exports = user
