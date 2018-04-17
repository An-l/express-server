let express = require('express')
let router = express.Router()
// let db = require('./../db')

let controllers = require('./../controllers/fileCenter')

/* GET home page. */
router.get('/majorOffice', async (req, res, next) => {
  res.end(await controllers.getMajorOffice(req))
})

module.exports = router
