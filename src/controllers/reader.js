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
    const { id } = request.params
    const reader = await Reader.findByPk(id)
    const  { email }  = request.body
    const [ updatedRows ] = await Reader.update({email: email}, {where: {id: id}})
    if(!reader) {
        response.status(404).json({ error: 'The reader could not be found.'})
    }

    else {
        response.status(200).json(updatedRows)
    }
    
}

exports.deleteById = async (request, response) => {
    const { id } = request.params
    const reader = await Reader.findByPk(id)
    const deletedRows = await Reader.destroy({where: {id: id}})
    if(!reader) {
        response.status(404).json({error: 'The reader could not be found.'})
    }
    else{
        response.status(204).json(deletedRows)
    }
}



