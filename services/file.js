/**
 * 档案业务操作
 */

const Service = require('./index.js')
const fileModel = require('../models/file')
const userModel = require('../models/user').userModule

class FileService extends Service {
  constructor(...args) {
    super(...args)
  }

  async createFileAndAccount(fileData, userData) {
    let { username, password, fileType } = userData

    let createFileResult = await this.model.create(fileData)

    let createAccountResult = userModel.create({
      username,
      password,
      file_id: createFileResult.insertId,
      file_type: fileType
    })

    if (createFileResult && createAccountResult) {
      return true
    } else {
      return false
    }
  }
}

/** 省 */
class MajorOfficeService extends FileService {
  constructor(module) {
    super(module)
  }
}

/** 办公室 */
class OfficeService extends FileService {
  constructor(module) {
    super(module)
  }
}

module.exports = {
  majorOfficeService: new MajorOfficeService(fileModel.majorOfficeModule),
  officeService: new OfficeService(fileModel.officeModule)
}
