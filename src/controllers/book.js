const { getAllItems, getItemById, deleteItem, updateItem } = require("../../test-helpers/helpers")
const { Book } = require("../models")


exports.create= async (request, response) => {
    try {
const newBook = await Book.create(request.body)
response.status(201).json(newBook)}
catch(error) {
    console.log('ERROR: ', error.name)
     if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
         const errors = error.errors.map(err => err.message);
         response.status(400).json({errors})
     }
     else {
         throw error;
     }
}
}

const read = (_, response) => getAllItems(response, 'book,')

const readById = (request, response) => getItemById(response, 'book', request.params.id)

const updateById = (request, response) => updateItem(response, 'book', request.body, request.params.id)

const deleteById = (request, response) => deleteItem(response, 'book', request.params.id)


module.exports = {
    read,
    readById,
    deleteById,
    updateById
 }