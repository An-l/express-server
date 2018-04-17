const allConfig = require('config')
const config = allConfig.mysql
const mysql = require('mysql')

const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
})

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

/**
 * 创建表
 * @param {String} sql sql语句
 */
let createTable = function(sql) {
  return query(sql, [])
}

/**
 * 根据id查询
 * @param {String} table 表名
 * @param {String} id 要查询的id
 */
let findDataById = function(table, id) {
  let _sql = 'SELECT * FROM ?? WHERE id = ? '
  return query(_sql, [table, id])
}

/**
 * 分页查询
 * @param {Sting} table 表名
 * @param {Sting} keys 字段
 * @param {Sting} start 开始位置
 * @param {Sting} end 结束位置
 */
let findDataByPage = function(table, keys, start, end) {
  let _sql = 'SELECT ?? FROM ??  LIMIT ? , ?'
  return query(_sql, [keys, table, start, end])
}

/**
 * 插入
 * @param {Sting} table 表名
 * @param {Sting} values 插入的数据
 */
let insertData = function(table, values) {
  let _sql = 'INSERT INTO ?? SET ?'
  return query(_sql, [table, values])
}

/**
 * 根据id更新
 * @param {Sting} table 表名
 * @param {object} values 更新的数据
 * @param {Sting} id
 */
let updateDataById = function(table, values, id) {
  let _sql = 'UPDATE ?? SET ? WHERE id = ?'
  return query(_sql, [table, values, id])
}

/**
 * 根据id删除
 * @param {Sting} table 表名
 * @param {Sting} id
 */
let deleteDataById = function(table, id) {
  let _sql = 'DELETE FROM ?? WHERE id = ?'
  return query(_sql, [table, id])
}

/**
 * 查询
 * @param {Sting} table 表名
 * @param {Sting} keys 字段名
 */
let select = function(table, keys) {
  let _sql = 'SELECT ?? FROM ?? '
  keys = keys || '*'
  return query(_sql, [keys, table])
}

/**
 * 统计
 * @param {Sting} table 表名
 */
let count = function(table) {
  let _sql = 'SELECT COUNT(*) AS total_count FROM ?? '
  return query(_sql, [table])
}

module.exports = {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateDataById,
  select,
  count
}
