const faker = require('faker')

exports.bookCollection= (options = {}) => ({
title: options.title || faker.random.words(),
author: options.author || faker.name.findName(),
genre: options.genre || faker.random.word(),
ISBN: options.ISBN || faker.finance.routingNumber()
})

exports.readersList = (options = {}) => ({
    name: options.name || faker.name.findName(),
    email: options.email || faker.internet.exampleEmail(),
    password: options.password || faker.random.alphaNumeric()
})