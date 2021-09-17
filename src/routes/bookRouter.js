const express = require('express')
const app = express()
app.use(express.json())
const router = express.Router()
const bookCtrl = require('../controllers/book')

router.post('/', bookCtrl.create)

router.get('/', bookCtrl.read)

router.get('/:id',bookCtrl.readById)




module.exports = router;