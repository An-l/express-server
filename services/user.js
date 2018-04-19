/**
 * 用户业务操作
 */
const Service = require('./index.js')
const userModel = require('../models/user').userModule

class UserService extends Service {
  constructor(module) {
    super(module)
  }

  /**
   * 登录操作
   * @param  {String} username 用户名
   * @param  {String} password 密码
   * @return {object}          登录操作结果
   */
  async login(username, password) {
    let resultData = {}

    let userData = await userModel.getOneByUserNameAndPassword(
      username,
      password
    )
    if (userData) {
      // 根据用户id，获取用户权限id；
      let authorityList = []
      let { authorityIds, name } = await userModel.getCharactersById(
        userData.character_id
      )
      // 根据权限id，获取前端路由表
      authorityIds = authorityIds.split(',')
      for (const id of authorityIds) {
        authorityList.push(await userModel.getAuthorityById(id))
      }

      let userInfo = {}
      // 判断该用户所属级别，获取用户档案信息
      switch (userData.file_type) {
        case 'major_office':
          userInfo = await userModel.getMajorOfficeById(userData.file_id)
          break
        case 'office':
          userInfo = await userModel.getOfficeById(userData.file_id)
          break
        case 'managers':
          userInfo = await userModel.getManagersById(userData.file_id)
          break
        case 'room':
          userInfo = await userModel.getRoomById(userData.file_id)
          break
      }

      resultData = {
        power: name,
        authorityList: authorityList,
        userInfo: userInfo
      }
    } else {
      return false
    }
    return resultData
  }
}

module.exports = {
  userService: new UserService(userModel.userModule)
}
