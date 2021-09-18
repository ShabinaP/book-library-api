const faker = require('faker')

exports.bookCollection= () => ({
title: faker.random.words(),
author: faker.name.findName(),
genre: faker.random.word,
ISBN: faker.datatype.number()
})