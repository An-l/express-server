let path = require('path')
let log4js = require('log4js')

/**
 * 日志文件配置
 * @class LoggerUtils
 */
class LoggerUtils {
  // 初始化定义参数
  constructor () {
    // 日志根目录
    const baseLogPath = path.resolve(__dirname, '../logs')

    // 错误日志目录
    const errorPath = '/error'
    // 错误日志文件名
    const errorFileName = 'error'
    // 错误日志输出完整路径
    const errorLogPath = baseLogPath + errorPath + '/' + errorFileName
    // const errorLogPath = path.resolve(__dirname, "../logs/error/error")
    // 响应日志目录
    const responsePath = '/response'
    // 响应日志文件名
    const responseFileName = 'response'
    // 响应日志输出完整路径
    const responseLogPath = baseLogPath + responsePath + '/' + responseFileName

    this.baseConfig = {
      appenders: {
        // 错误日志
        errorLogger: {
          'type': 'dateFile', // 日志类型
          'filename': errorLogPath, // 日志输出位置
          'alwaysIncludePattern': true, // 是否总是有后缀名
          'pattern': '-yyyy-MM-dd.log', // 后缀，每小时创建一个新的日志文件
          'path': errorPath // 自定义属性，错误日志的根目录
        },
        // 响应日志
        resLogger: {
          'type': 'dateFile',
          'filename': responseLogPath,
          'alwaysIncludePattern': true,
          'pattern': '-yyyy-MM-dd.log',
          'path': responsePath
        }
      },
      categories: {
        default: {
          appenders: ['errorLogger'],
          level: 'debug'
        },
        errorLogger: {
          appenders: ['errorLogger'],
          level: 'error'
        },
        resLogger: {
          appenders: ['resLogger'],
          level: 'debug'
        }
      },
      baseLogPath: baseLogPath
    }
  }

  logError (req, error, resTime) {
    log4js.configure(this.baseConfig)

    if (req) {
      log4js.getLogger('errorLogger').error(this.formatError(req, error, resTime))
    }
  }

  logResponse (req, res, resTime) {
    log4js.configure(this.baseConfig)

    if (req) {
      console.log(res)
    //   if (req.status === 200) {
        log4js.getLogger('resLogger').info(this.formatRes(req, res, resTime))
    //   } else {
    //     log4js.getLogger('errorLogger').error(this.formatRes(req, resTime))
    //   }
    }
  }

  formatRes (req, res, resTime) {
    var logText = ''

    // 响应日志开始
    logText += '\n' + '*************** response log start ***************' + '\n'

    // 添加请求日志
    logText += this.formatReqLog(req, res, resTime)

    // 响应状态码
    // logText += 'response status: ' + req.status + '\n'

    // 响应内容
    logText += 'response body: ' + '\n' + JSON.stringify(res.body) || '' + '\n'

    // 响应日志结束
    logText += '\n*************** response log end ***************' + '\n'

    return logText
  }

  formatError (req, err, resTime) {
    var logText = ''

    // 错误信息开始
    logText += '\n' + '*************** error log start ***************' + '\n'

    // 添加请求日志
    logText += this.formatReqLog(req.request, resTime)

    // 错误名称
    logText += 'err name: ' + err.name + '\n'
    // 错误信息
    logText += 'err message: ' + err.message + '\n'
    // 错误详情
    logText += 'err stack: ' + err.stack + '\n'

    // 错误信息结束
    logText += '*************** error log end ***************' + '\n'

    return logText
  }

  // 格式化请求日志
  formatReqLog (req, res, resTime) {
    var logText = ''
    // var method = req.method
    // 访问方法
    logText += 'request method: ' + req.method + '\n'

    // 请求原始地址
    logText += 'request originalUrl:  ' + req._parsedUrl.pathname + '\n'

    // 开始时间
    // var startTime
    // 请求参数
    if (req.method === 'GET') {
      logText += '\nrequest query:  ' + '\n' + JSON.stringify(req.query) || '' + ' \n'
      // startTime = req.query.requestStartTime;
    } else {
      logText += '\nrequest body: ' + '\n' + JSON.stringify(req.body) || '' + '\n'
      // startTime = req.body.requestStartTime;
    }
    // 服务器响应时间
    logText += '\nresponse time: ' + resTime + '\n'

    return logText
  }
}

module.exports = new LoggerUtils()
