const express = require('express')
const app = express()
app.use(express.json())
const router = express.Router()
const readerCtrl = require('../controllers/reader')

router.route('/reader').get(readerCtrl.read).post(readerCtrl.create)

router
.route('/reader/:id')
.get(readerCtrl.readById)
.patch(readerCtrl.updateById)
.delete(readerCtrl.deleteById)

module.exports = router;