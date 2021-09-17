const { Book } = require("../models")
const book = require("../models/book")

exports.create= async (request, response) => {
const newBook = await Book.create(request.body)
console.log(newBook)
response.status(201).json(newBook)
}

exports.read = async (request, response) => {
    const books = await Book.findAll()
    response.status(200).json(books)
}

exports.readById = async (request, response) => {
    const bookId = request.params.id
    const book = await Book.findByPk(bookId)
    if(!book) {
        response.status(404).json({ error: 'The book could not be found.'})
    }
    else {
    response.status(200).json(book)}
}