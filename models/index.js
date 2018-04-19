const dbUtils = require('../utils/db-util.js')

class Models {
  constructor(table) {
    this.table = table
  }

  async getList(start, end) {
    let result = await dbUtils.findDataByPage(this.table, '*', start, end)
    if (Array.isArray(result) && result.length > 0) {
      return result
    } else {
      return null
    }
  }

  async create(obj) {
    let result = await dbUtils.insertData(this.table, obj)

    return result
  }
  async delete(id) {
    let result = await dbUtils.changeStatusDataById(this.table, id, '删除')
    return result
  }
  async update(id, obj) {
    let result = await dbUtils.updateDataById(this.table, id, obj)
    return result
  }

  async count() {
    let result = await dbUtils.count(this.table)
    return result[0].totals
  }
}

module.exports = Models
