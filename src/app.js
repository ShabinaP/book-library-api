const express = require('express');
const app = express()
app.use(express.json())
const { Reader } = require('./models');
const readerCtrl = require('./controllers/reader')
const bookRouter = require('./routes/bookRouter')
const readerRouter = require('./routes/readerRouter')

app.use('/reader', readerRouter)

app.use('/books', bookRouter )



module.exports = app;