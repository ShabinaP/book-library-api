const { Book } = require("../models")

exports.create= async (request, response) => {
const newBook = await Book.create(request.body)
console.log(newBook)
response.status(201).json(newBook)
}

exports.read = async (request, response) => {
    const books = await Book.findAll()
    response.status(200).json(books)
}

