const { getAllItems } = require("../../test-helpers/helpers");
const genre = require("../models/genre");


const read = (_, response) => getAllItems(response, genre)