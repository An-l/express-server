let qiniu = require('qiniu')
let path = require('path')
let { qiniuConfig } = require('config')

class QiniuUitls {
  // 定义配置变量
  constructor () {
    // 初始化数据
    const accessKey = qiniuConfig.accessKey
    const secretKey = qiniuConfig.secretKey
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const bucket = qiniuConfig.bucket

    // 配置上传凭证
    const options = {
      scope: bucket,
      expires: 7200 // 设置凭证有效期，7200 = 2hour
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    this.token = putPolicy.uploadToken(mac)
  }

  // 上传文件到七牛
  putFile () {
    var config = new qiniu.conf.Config()
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z0

    var localFile = path.resolve(__dirname, '../logs/response/response-2018-03-06-13.log')
    var formUploader = new qiniu.form_up.FormUploader(config)
    var putExtra = new qiniu.form_up.PutExtra()
    var key = 'test.log'
    // 文件上传
    formUploader.putFile(this.token, key, localFile, putExtra, function (respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode === 200) {
        console.log(respBody)
      } else {
        console.log(respInfo.statusCode)
        console.log(respBody)
      }
    })
  }
}

module.exports = new QiniuUitls()
