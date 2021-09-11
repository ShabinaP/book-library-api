const { response, request } = require('express');
const { Reader } = require('../models');

exports.create = async (request, response) => {
const newReader = await Reader.create(request.body)
    response.status(201).json(newReader)
}