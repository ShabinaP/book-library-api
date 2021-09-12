const { response, request } = require('express');
const { Reader } = require('../models');

exports.create = async (request, response) => {
const newReader = await Reader.create(request.body)
    response.status(201).json(newReader)
}

exports.read = async(request, response) => {
    const readers= await Reader.findAll()
    response.status(200).json(readers)
}

exports.readById = async(request, response) => {
const readerId = request.params.id
const reader = await Reader.findByPk(readerId)
if(!reader) {
    response.status(404).json({ error: 'The reader could not be found.'})
}
else {
response.status(200).json(reader)}
}

exports.updateById = async (request, response) => {
    const readerId = request.params.id
    
}