/**
 * restful user 子路由
 */

const express = require('express')
const router = express.Router()
const userController = require('./../controllers/user')

const routers = router
  /**
   * @swagger
   * /user/login:
   *   post:
   *     tags:
   *       - Puppies
   *     description: 登录
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: 用户名
   *         in: "formData"
   *         required: true
   *       - name: password
   *         description: 密码
   *         in: "formData"
   *         required: true
   *     responses:
   *       200:
   *         description: 登录成功
   */

  .post('/login', userController.login)
  .get('/getAllUser', userController.getAllUser)

module.exports = routers
