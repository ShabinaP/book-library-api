const express = require('express');
const app = express()
app.use(express.json())
const { Reader } = require('./models');
const readerCtrl = require('./controllers/reader')
const bookRouter = require('./routes/bookRouter')
const readerRouter = require('./routes/readerRouter')
const genreRouter = require('./routes/genreRouter')

app.use('/reader', readerRouter)

app.use('/books', bookRouter )

app.use('/genre', genreRouter)



module.exports = app;