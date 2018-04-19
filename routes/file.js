/**
 * restful file 子路由
 */

const express = require('express')
const router = express.Router()
const fileController = require('./../controllers/file')

const routers = router
  /**
   * @swagger
   * /file/login:
   *   post:
   *     tags:
   *       - Puppies
   *     description: 登录
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: filename
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

  /** 省 **/
  .get('/majorOffice', fileController.majorOffice.getList.bind(fileController.majorOffice))
  .post('/majorOffice', fileController.majorOffice.createFileAndAccount.bind(fileController.majorOffice))
  .delete('/majorOffice/:id', fileController.majorOffice.delete.bind(fileController.majorOffice))
  .put('/majorOffice/:id', fileController.majorOffice.update.bind(fileController.majorOffice))

  /** 办公室 */
  .get('/office', fileController.office.getList.bind(fileController.office))
  .post('/office', fileController.office.createFileAndAccount.bind(fileController.office))
  .delete('/office/:id', fileController.office.delete.bind(fileController.office))
  .put('/office/:id', fileController.office.update.bind(fileController.office))

module.exports = routers
