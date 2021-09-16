const express = require('express');
const app = express()
app.use(express.json())
const { Reader } = require('./models');
const readerCtrl = require('./controllers/reader')
const router = require('./routes/bookRouter')

app.post('/reader', readerCtrl.create);

app.get('/reader', readerCtrl.read);

app.get('/reader/:id', readerCtrl.readById);

app.patch('/reader/:id', readerCtrl.updateById);

app.delete('/reader/:id', readerCtrl.deleteById);

app.use('/book', router)

module.exports = app;