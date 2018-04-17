const utilsModel = require('../models/utils')
let out = require('./../utils/out_utils')

module.exports = {
  // 获取地区信息
  async getAreas(req, res, next) {
    let pid = req.params.pid
    let resultData = await utilsModel.getAreasByPid(pid)
    console.log(resultData)
    if (resultData) {
      res.send(out.success(resultData, ''))
    } else {
      res.send(out.error('', '该地区id不存在'))
    }
  }
}
