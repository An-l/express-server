const dbUtils = require('../utils/db-util.js')

let table = {
  areas: 'areas'
}
const utils = {
  /**
   * 根据pid查找位置
   * @param  {ini} pid
   * @return {object|null}     查找结果
   */
  async getAreasByPid(pid) {
    let result = await dbUtils.query(`SELECT * FROM ${table.areas} WHERE pid = ${pid} `)

    if (Array.isArray(result) && result.length > 0) {
      return result
    }
    return null
  }
}

module.exports = utils
