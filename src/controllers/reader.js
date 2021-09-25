const { response, request } = require('express');
const { getAllItems, getItemById, deleteItem, updateItem, createItem } = require('../../test-helpers/helpers');
const { Reader } = require('../models');

const createReader = (request, response) => createItem(response, 'reader', request.body)

const getReader = (_, response) => getAllItems(response, 'reader')

const getReaderById = (request, response) => getItemById(response, 'reader', request.params.id)

const updateReaderById = (request, response) => updateItem(response, 'reader', request.body, request.params.id)

const deleteReaderById = (request, response) => deleteItem(response, 'reader', request.params.id)




module.exports = {
   getReader,
   getReaderById,
   createReader,
   deleteReaderById,
   updateReaderById
}