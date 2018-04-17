let out = require('../utils/out_utils')
let dbUtils = require('../utils/db-util')
// let crypto = require('crypto')

module.exports = {
  async getMajorOffice(req) {
    const data = await dbUtils.query(
      `select * from major_office where office_name LIKE '%${req.keywork ||
        ''}%' limit ${req.pageNum * 10 || 0},${req.pageSize || 10}`
    )
    const _data = {
      data: data,
      pageSize: req.pageSize || 10,
      pageNum: req.pageNum,
      total: data.length
    }
    return out.success(_data, '')
  }
}
