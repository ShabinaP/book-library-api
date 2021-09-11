const express = require('express');
const app = express()
app.use(express.json())

const readerCtrl = require('./controllers/reader')

app.post('/readers', readerCtrl.create);


module.exports = app;