const express = require('express')
const path = require('path')
// const favicon = require('serve-favicon')
const logger = require('morgan') // debug日志
const cookieParser = require('cookie-parser') // session的认证机制必须依赖cookie
const bodyParser = require('body-parser') // 处理post请求数据
const session = require('express-session') // 处理session的中间件
// const loggerUtils = require('./utils/logger_utils')

var swaggerJSDoc = require('swagger-jsdoc') // swagger文档生成

const routes = require('./routes')

const app = express()

var swaggerDefinition = {
  info: {
    title: '艺术特长生网站 system API',
    version: 'v1.0',
    description: '艺术特长生网站 system API'
  },
  host: '127.0.0.1:3001',
  basePath: '/'
}
// swagger docs的配置
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js']
}
// 加载swagger
var swaggerSpec = swaggerJSDoc(options)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Credentials', true)// Allow Cookie
  if (req.method === 'OPTIONS') {
    res.send(200)// 让options请求快速返回
  } else {
    next()
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser()) // 设置cookie
app.use(session({
  secret: 'node-tpl',
  name: 'code', // 这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: { maxAge: 30 * 1000 * 60 }, // 设置maxAge是80000ms，即30分钟后session和相应的cookie失效过期
  resave: false
  // saveUninitialized: true // 是否自动保存未初始化的会话，建议false
}))

// 设置静态文件路径
// app.use(express.static(path.join(__dirname, 'public')))

routes(app)

// 启动swagger文档，使用路由访问
app.get('/system.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
