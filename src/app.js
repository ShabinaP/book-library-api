const express = require('express');
const app = express()
app.use(express.json())
const { Reader } = require('./models');
const readerCtrl = require('./controllers/reader')

app.post('/reader', readerCtrl.create);


module.exports = app;