const { getAllItems, getItemById, deleteItem, updateItem, createItem } = require("../../test-helpers/helpers")

const createBook= (request, response) => createItem(response, 'book', request.body)

const getBook = (_, response) => getAllItems(response, 'book')

const getBookById = (request, response) => getItemById(response, 'book', request.params.id)

const updateBookById = (request, response) => updateItem(response, 'book', request.body, request.params.id)

const deleteBookById = (request, response) => deleteItem(response, 'book', request.params.id)


module.exports = {
    createBook,
    getBook,
    getBookById,
    updateBookById,
    deleteBookById
 
 }