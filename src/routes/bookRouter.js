const express = require('express')
const app = express()
app.use(express.json())
const router = express.Router()
const bookCtrl = require('../controllers/book')

router.route('/').get(bookCtrl.read).post(bookCtrl.create)

router
.route('/:id')
.get(bookCtrl.readById)
.patch(bookCtrl.updateById)
.delete(bookCtrl.delete)






module.exports = router;