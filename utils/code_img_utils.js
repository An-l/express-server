var Captchapng = require('captchapng') // 生成图片库
/**
 * 生成图片库,保存session
 * @param {any} ctx 请求头
 * @param {any} next 过渡
 */
module.exports = (req, res, next) => {
  // 获取图片的宽高
  const { width = 80, height = 35 } = req.query
  const str = parseInt(Math.random() * 9000 + 1000) // 随机生成数字
  res.session.code = str // 存入session
  const picture = new Captchapng(width, height, str) // 生成图片
  picture.color(0, 0, 0, 0)
  picture.color(80, 80, 80, 255)
  var img = picture.getBase64()
  req.img = img
  next()
}
