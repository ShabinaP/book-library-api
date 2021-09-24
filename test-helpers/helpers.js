const { Book, Reader } = require('../src/models')

const get404Error = (model) => ({ error: `The {model} could not be found.`})

const getModel = (model) => {
    const models = {
        book: Book,
        reader: Reader
    }
    return models[model]
}

const getOptions = (model) => {
    if (model === 'book') return { include: Genre }
    if(model === 'genre') return { include: Book }

    return {}
}

const getAllItems = async (response, model) => {
    const Model = getModel(model)
  const options = getOptions(model)

  

}







module.exports = {
    getAllItems
}