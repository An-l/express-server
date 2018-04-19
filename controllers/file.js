const Controllers = require('./index.js')
const fileService = require('../services/file')
let out = require('./../utils/out_utils')

class File extends Controllers {
  constructor(...args) {
    super(...args)
  }

  async createFileAndAccount(req, res, next) {
    let data = { ...req.body }
    console.log(data);
    let userData = data.userData
    let fileData = data.fileData
    let { username, password, passwordAgain, fileType } = userData

    if ([username, password, passwordAgain, fileType].some(item => item === '')) {
      res.send(out.error('', '提交数据不完善'))
      return
    } else if (password !== passwordAgain) {
      res.send(out.error('', '两次输入密码不一致'))
      return
    }

    userData.username = userData.username.trim()
    userData.password = userData.password.trim()
    userData.passwordAgain = userData.passwordAgain.trim()

    let resultData = await this.service.createFileAndAccount(fileData, userData)

    if (resultData) {
      res.send(out.success('', '插入成功'))
    } else {
      res.send(out.error('', ''))
    }
  }
}

/** 省 */
class MajorOffice extends File {
  constructor(service) {
    super(service)
  }
}

/** 办公室 */
class Office extends File {
  constructor(service) {
    super(service)
  }
}

module.exports = {
  majorOffice: new MajorOffice(fileService.majorOfficeService),
  office: new Office(fileService.officeService)
}
