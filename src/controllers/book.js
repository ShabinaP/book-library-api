const { Book, Reader } = require("../models")
const book = require("../models/book")

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

exports.read = async (request, response) => {
    const books = await Book.findAll()
    response.status(200).json(books)
}

exports.readById = async (request, response) => {
    const { id } = request.params
    const book = await Book.findByPk(id)
    if(!book) {
        response.status(404).json({ error: 'The book could not be found.'})
    }
    else {
    response.status(200).json(book)}
}

exports.delete = async (request, response) => {
    const { id } =  request.params
    const book = await Book.findByPk(id)
    const deletedRows = await Book.destroy({ where: {id: id}})
    if(!book) {
        response.status(404).json({ error: 'The book could not be found.'})
    }
    else {
        response.status(204).json(deletedRows)
    }
}