const Modules = require('./index.js')

// const dbUtils = require('../utils/db-util.js')

let table = {
  major_office: 'major_office', // 省级
  office: 'office', // 办公室
  managers: 'managers', // 经理
  room: 'room' // 考场
}

/** 省 */
class MajorOfficeModule extends Modules {
  constructor(table) {
    super(table)
  }
}

/** 办公室 */
class OfficeModule extends Modules {
  constructor(table) {
    super(table)
  }
}

module.exports = {
  majorOfficeModule: new MajorOfficeModule(table.major_office),
  officeModule: new OfficeModule(table.office)
}
