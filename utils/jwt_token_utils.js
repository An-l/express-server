let jwt = require('jsonwebtoken')
let { jwtSecret } = require('config')

class JwtToken {
  /**
   * Creates an instance of JwtToken.
   * @memberof JwtToken
   */
  constructor () {
    this.secret = jwtSecret
  }

  /**
   * 设置token
   * @param {any} data token参数
   * @param {any} time token过期时间
   * @memberof JwtToken
   */
  setToken (data, time) {
    let _time = time || 60 // token失效时长，单位：分钟，默认30分钟
    return jwt.sign({ data: data, exp: Math.floor(Date.now() / 1000) + (60 * _time) }, this.secret)
  }

  checkToken (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
    // 获取请求中的token
    let token = req.body.token || req.query.token || req.headers.authorization
    if (token) {
      // 存在token，解析token
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) { // 解析失败直接返回失败警告
          if (err.name === 'TokenExpiredError') { // token过期
            return res.end(JSON.stringify({code: 401, msg: '用户已过期, 请重新登录'}))
          } else if (err.name === 'JsonWebTokenError') { // token错误
            return res.end(JSON.stringify({code: 401, msg: '用户证书出错, 请重新登录'}))
          }
          // return res.json({success: false, msg: 'token错误'})
        } else {
          // token正确，继续执行后续方法
          next()
        }
      })
    } else {
      // 无效的token401
      return res.end(JSON.stringify({code: 401, msg: '无权访问, 请登录'}))
    }
  }
}

module.exports = new JwtToken()
