const userService = require('../services/user')
const crypto = require('crypto')
let out = require('./../utils/out_utils')

module.exports = {
  async login(req, res, next) {
    // 获取账号密码
    let { username, password } = req.body
    var md5 = crypto.createHash('md5')
    var md5Password = md5.update(password).digest('hex')

    let resultData = await userService.login(username, md5Password)

    if (resultData.id) {
      res.send(out.success(resultData, '登录成功'))
    } else {
      res.send(out.error('', '账号或密码错误'))
    }
  },

  async getAllUser(req, res, next) {
    let userResult = await userService.getAllUser()
    res.send(out.success(userResult, ''))
  }
}
