/**
 * 用户业务操作
 */

const userModel = require('../models/user')

const user = {
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
      let { authorityIds, name } = userModel.getCharactersById(
        userData.character_id
      )

      // 根据权限id，获取前端路由表
      authorityIds = authorityIds.split(',')
      for (const id of authorityIds) {
        authorityList.push(userModel.getAuthorityById(id))
      }

      let userInfo = {}
      // 判断该用户所属级别
      //   switch (userData.belong_type) {
      //     case 'major_office':
      //       userInfo = (await db.find(
      //         `select * from major_office where id = '${userData.belong_id}'`
      //       ))[0]
      //       break
      //     default:
      //       break
      //   }

      resultData = {
        power: name,
        authorityList: authorityList,
        userInfo: userInfo
      }
    }
    return resultData
  },
  /**
   * 登录操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录操作结果
   */
  async getAllUser() {
    let resultData = await userModel.showAllUser()
    return resultData
  }
}

module.exports = user
