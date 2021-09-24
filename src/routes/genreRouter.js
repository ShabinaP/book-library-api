const express = require('express')
const app = express()
app.use(express.json())
const router = express.Router()
const genreCtrl = require('../controllers/genre')

router.route('/genre').get(genreCtrl.read)