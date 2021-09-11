const { response, request } = require('express');

exports.create = async (request, response) => {
    response.sendStatus(201)
}