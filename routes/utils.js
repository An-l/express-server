/**
 * restful utils 子路由
 */

const express = require('express')
const router = express.Router()
const utilsController = require('../controllers/utils')

const routers = router.get('/areas/:pid', utilsController.getAreas)

module.exports = routers
