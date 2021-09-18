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

app.patch('/reader/:id', readerCtrl.update);

app.delete('/reader/:id', readerCtrl.deleteById);

app.use('/book', router);

app.use('/book/:id', router);

module.exports = app;