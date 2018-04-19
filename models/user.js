const Modules = require('./index.js')
const dbUtils = require('../utils/db-util.js')

let table = {
  user: 'account',
  characters: 'characters',
  authority: 'authority',
  majorOffice: 'major_office',
  office: 'office',
  managers: 'managers',
  room: 'room'
}

class UserModule extends Modules {
  constructor(table) {
    super(table)
  }

  /**
   * 根据用户名和密码查找用户
   * @param  {String} username 用户名密码对象
   * @param  {String} password 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword(username, password) {
    let _sql = `
    SELECT * from ${table.user}
      where password="${password}" and username="${username}"`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }

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
  }

  /**
   * 根据id查找用户权限
   * @param  {ini} id
   * @return {object|null}     查找结果
   */
  async getCharactersById(id) {
    let result = await dbUtils.findDataById(table.characters, id)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }

  /**
   * 根据id查找前端路由
   * @param  {init} id
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
  /**
   * 根据id查找总办公室档案
   * @param {init} id id
   * @returns {object|null}
   */
  async getMajorOfficeById(id) {
    let result = await dbUtils.findDataById(table.majorOffice, id)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }
  /**
   * 根据id查找市办公室档案
   * @param {init} id id
   * @returns {object|null}
   */
  async getOfficeById(id) {
    let result = await dbUtils.findDataById(table.office, id)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }
  /**
   * 根据id查找总办公室档案
   * @param {init} id id
   * @returns {object|null}
   */
  async getManagersById(id) {
    let result = await dbUtils.findDataById(table.managers, id)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }
  /**
   * 根据id查找总办公室档案
   * @param {init} id id
   * @returns {object|null}
   */
  async getRoomById(id) {
    let result = await dbUtils.findDataById(table.room, id)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }
}

module.exports = {
  userModule: new UserModule(table.user)
}
